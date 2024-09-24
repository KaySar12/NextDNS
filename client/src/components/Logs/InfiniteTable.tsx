import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import throttle from 'lodash/throttle';

import Loading from '../ui/Loading';

import Header from './Cells/Header';
import { getLogs } from '../../actions/queryLogs';

import Row from './Cells';

// import { isScrolledIntoView } from '../../helpers/helpers';
// import { QUERY_LOGS_PAGE_LIMIT } from '../../helpers/constants';
import { RootState } from '../../initialState';

interface InfiniteTableProps {
    isLoading: boolean;
    items: unknown[];
    isSmallScreen: boolean;
    setDetailedDataCurrent: Dispatch<SetStateAction<any>>;
    setButtonType: (...args: unknown[]) => unknown;
    setModalOpened: (...args: unknown[]) => unknown;
}

const InfiniteTable = ({
    isLoading,
    items,
    isSmallScreen,
    setDetailedDataCurrent,
    setButtonType,
    setModalOpened,
}: InfiniteTableProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const loader = useRef(null);
    const loadingRef = useRef<boolean>(false);

    const [loadingClick, setLoadingClick] = useState(false);
    const isEntireLog = useSelector((state: RootState) => state.queryLogs.isEntireLog);

    const processingGetLogs = useSelector((state: RootState) => state.queryLogs.processingGetLogs);
    const loading = isLoading || processingGetLogs;

    // Listener function that triggers data fetching
    const listener = useCallback(() => {
        if (!loadingRef.current && loader.current && loadingClick) {
            dispatch(getLogs());
            setLoadingClick(false);
        }
    }, [loadingClick, dispatch]);

    // Effect that runs listener on loadingClick change
    useEffect(() => {
        listener();
    }, [listener]);

    const handleClick = () => {
        setLoadingClick(true);
    };

    // Sync processing state to ref to avoid stale closures
    useEffect(() => {
        loadingRef.current = processingGetLogs;
    }, [processingGetLogs]);

    // useEffect(() => {
    //     listener();
    // }, [items.length < QUERY_LOGS_PAGE_LIMIT, isEntireLog]);

    useEffect(() => {
        const THROTTLE_TIME = 100;
        const throttledListener = throttle(listener, THROTTLE_TIME);

        window.addEventListener('scroll', throttledListener);
        return () => {
            window.removeEventListener('scroll', throttledListener);
        };
    }, [listener]);

    // Render a row for each item
    const renderRow = (row: any, idx: any) => (
        <Row
            key={idx}
            rowProps={row}
            isSmallScreen={isSmallScreen}
            setDetailedDataCurrent={setDetailedDataCurrent}
            setButtonType={setButtonType}
            setModalOpened={setModalOpened}
        />
    );

    // Check if no items found and not loading
    const isNothingFound = items.length === 0 && !processingGetLogs;

    return (
        <div className="logs__table" role="grid">
            <Header />
            {loading && <Loading />}
            {isNothingFound ? (
                <label className="logs__no-data">{t('nothing_found')}</label>
            ) : (
                <>
                    {items.map(renderRow)}
                    {!isEntireLog && (
                        //  <div ref={loader} className="logs__loading text-center">
                        //     {t('loading_table_status')}
                        // </div>
                        <div
                            ref={loader}
                            className="logs__loading text-center"
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                        >
                            {t('load_table_status')}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default InfiniteTable;

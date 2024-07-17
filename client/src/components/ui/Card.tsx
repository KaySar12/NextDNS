import React from 'react';

import './Card.css';
import { useTranslation } from 'react-i18next';

interface CardProps {
    id?: string;
    title?: string;
    subtitle?: string;
    bodyType?: string;
    type?: string;
    refresh?: React.ReactNode;
    children: React.ReactNode;
}

const Card = ({ type, id, title, subtitle, refresh, bodyType, children }: CardProps) => {
    const { t } = useTranslation();
    const checkTitle = t('check_title');
    return (
        <div className={type ? `card ${type}` : 'card'} id={id || ''}>
            {(title || subtitle) && (
                <div
                    className={` ${title === checkTitle ? 'card-header-color card-header-radius' : ''} card-header with-border`}>
                    <div className="card-inner">
                        {title && <div className="card-title">{title}</div>}

                        {subtitle && <div className="card-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />}
                    </div>

                    {refresh && <div className="card-options">{refresh}</div>}
                </div>
            )}

            <div className={bodyType || 'card-body'}>{children}</div>
        </div>
    );
};

export default Card;

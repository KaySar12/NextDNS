#!/bin/bash

# Đường dẫn file nguồn và file tạm để lưu nội dung tải về
SOURCE_URL="https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt"
TEMP_FILE="/tmp/filter_1.txt"

# Tải file từ URL và lưu vào file tạm
curl -o "$TEMP_FILE" "$SOURCE_URL"

# Thư mục chứa repository của bạn
REPO_PATH="/path/to/NextDNS-repo"

# Sao chép file tạm vào thư mục repository
cp "$TEMP_FILE" "$REPO_PATH/NextZen DNS filter.txt"

# Di chuyển đến thư mục repository
cd "$REPO_PATH"

# Cập nhật repository trên Gitea
git add "NextZen DNS filter.txt"
git commit -m "Auto-update DNS filter"
git push origin master

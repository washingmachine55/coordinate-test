#!/bin/bash/

TYPE=$(gum choose "All Office Apps" "Work Apps");


if [[ $TYPE == 'Work Apps' ]]; then
  exec alacritty --working-directory ./backend/ --hold -e bash -c "npm run secure-dev-debug & exec bash;" &
  exec alacritty --working-directory ./frontend/ -e bash -c "npm run dev" &
  exec alacritty --daemon -e "mailpit" &
  exec "insomnia" &
  exec "dbeaver" &
  exec bash -c "chromium --incognito --new-window https://localhost:5173 http://localhost:8025 https://localhost:3000";
else
  exec "slack-desktop" &
  exec bash -c "chromium --new-window";
fi

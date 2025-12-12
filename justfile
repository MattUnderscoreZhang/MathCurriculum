default:
    @just --list

# start the Vite dev server
dev:
    npm run dev

# compile files to dist/
build:
    npm run build

# serve compiled production files in dist/
preview:
    npm run preview

deploy:
    npm run deploy

deploy_help:
    echo "https://nikujais.medium.com/deploy-your-vite-react-app-on-github-pages-b52b2ad1edd2"

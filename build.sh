git clone https://github.com/rahitkar/write-it-out-frontend.git frontend ;

cd frontend;

npm install;

npm test;

npm run build;

mv ./build ..;

cd ..;

git clone https://github.com/rahitkar/write_it_out_backend.git backend;

cd backend;

npm install;

npm test;

rm -rf node_modules

cp -R ./* ..;

cd ..;

rm -rf frontend backend;

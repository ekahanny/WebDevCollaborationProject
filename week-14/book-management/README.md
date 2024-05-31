##Clone repository untuk mendapatkan seluruh kode

##menginstall seluruh dependensi
``` npm install ```

##untuk menjalankan script test JEST
```npm test```

##untuk menjalankan deployment PM2
```pm2 start ecosystem.config.js```

##untuk menjalankan dokumentasi proyek dengan JSDOCS
```npm start doc```

#API 
1. GET ```/books``` untuk mendapat seluruh data buku
2. GET ```/books/:id``` untuk mendapatkan data buku sesuai id
3. POST ```/books``` untuk menambahkan data buku baru
   json```{
    "title": "one piece last chapter",
    "author": "eichiro oda",
    "year": 2024
}
```
4. PUT ```/books/:id``` mengubah data buku sesuai id
json```{
    "title": "one piece last chapter april mop edition",
    "author": "eichiro oda",
    "year": 2024
}
```
5. DELETE ```/books/:id``` menghapus data buku sesuai id

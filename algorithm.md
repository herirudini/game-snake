- Arena/Ruang:
  - Arena dua dimensi X-Y (panjang x lebar)
  - Arrays of div's with coordinates as id
  - Coordinates berupa nX - nY
- Player Character (subject/ular):
  - Array berisi memori (jejak-jejak) koordinat yang dilalui
- Non-Player Character (object/mangsa):
  - Random point berupa satu titik koordinat
  - Koordinat mangsa harus berada di luar array si ular
- Time:
  - Game berjalan menggunakan interval looping
  - Pada setiap langkah interval terjadi Generate coordinat
  - Generate koordinat ular untuk menambah memori
  - Generate koordinat mangsa setiap kali dimakan
  - Hasil Generate pada control arah ular di push ke array si ular
  - Hapus index ular paling belakang pada setiap langkah
- Rules:
  - Apabila ular memakan mangsa, maka memory si ular bertambah (ular memanjang)
  - Apabila ular mengenai dirinya sendiri, maka Game Over
  - Apabila ular mengenai batas Arena, maka dia teleport ke batas sebaliknya
- Control:
  - Play: run Time
  - Pause: stop Time
  - Up: increment nY (koordinat si ular)
  - Down: decrement nY (koordinat si ular)
  - Right: increment nX (koordinat si ular)
  - Left: decrement nX (koordinat si ular)
  - Boost: increase interval timing
- Teleport:
  - apabila increment n lebih dari jatah array Arena, maka n === angka terkecil dari jatah
  - apabila decrement n kurang jatah array Arena, maka n === angka terbesar dari jatah
- Rendering:
  - Luas arena === max VW apabila Potrait, max VH apabila Landscape
  - Setiap id div diberikan border hitam, background putih
  - Setiap id div ditentukan panjang dan lebar
  - Apabila id div includes index array ular, maka kasih style color warna ular
  - Apabila id div === koordinat mangsa, maka kasih style color warna mangsa
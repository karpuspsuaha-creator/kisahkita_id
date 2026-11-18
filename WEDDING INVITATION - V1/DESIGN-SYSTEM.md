# Design System — Ivory Romantic Classic

Dokumen ini adalah kontrak visual Phase 01. Setiap keputusan di sini wajib dipakai
konsisten di Phase 02 (IA) sampai Phase 05 (Polish). Kalau ada yang berubah, dokumen ini
yang berubah — bukan implementasi.

Sumber kode token: `css/tokens.css`

---

## 1. Posisi

**Tema:** Ivory Romantic Classic
**Mood:** warm, intimate, tender, tenang — bukan glamor, bukan megah

**Kalimat panduan:**
>-IVory kosong yang hangat, bunga yang digambar dengan garis tipis, dan huruf yang
> ditulis tangan. Seolah undangan itu dicetak di kertas-stationery, bukan dirender di layar.

**Anti-pola yang dilarang** (ini yang membuat website terasa seperti template):
- Gradient ungu–pink
- Efek glassmorphism / card transparan berkilau
- Script yang terlalu tebal dan bergaya display (*Great Vibes* sudah dibuang)
- Animasi yang memantul (*bounce*), spin, atau zoom cepat
- Tombol berbentuk pil penuh warna solid

---

## 2. Colour

### 2.1 Palet inti

| Token | Hex | Peran |
| --- | --- | --- |
| `--paper` | `#FDFAF4` | Latar utama, ivory paling bersih |
| `--paper-warm` | `#F8F1E5` | Latar section selang-seling |
| `--paper-deep` | `#F2E8D8` | Latar inset, quote block, kartu gift |
| `--card` | `#FFFCF7` | Permukaan kartu di atas `--paper-warm` |
| `--ink` | `#3A2E2A` | Teks utama — coklat hangat, bukan hitam |
| `--ink-soft` | `#6B5B54` | Teks sekunder, paragraf |
| `--ink-muted` | `#9A8981` | Metadata, caption, placeholder |
| `--blush` | `#E9C7C2` | Isian lembut, latar lembut |
| `--blush-soft` | `#F3DEDB` | Latar paling pucat, badge |
| `--rose` | `#C0847C` | Aksen utama, link, hover |
| `--rose-deep` | `#9E615A` | Aksen kuat, teks aksen besar |
| `--sage` | `#A6B3A0` | Aksen sekunder botanical |
| `--sage-deep` | `#77876F` | Varian teks aman pada ivory |
| `--gold` | `#C0A468` | Aksen métalik-lembut, garis |
| `--champagne` | `#E7D6B4` | Garis halus, shimmer |

### 2.2 Garis & border

| Token | Nilai |
| --- | --- |
| `--line-hairline` | `rgba(58, 46, 42, .10)` |
| `--line-soft` | `rgba(192, 132, 124, .22)` |
| `--line-rose` | `rgba(192, 132, 124, .42)` |
| `--line-gold` | `rgba(192, 164, 104, .38)` |

Aturan: **jangan pernah memakai border solid di atas 1px.** Untuk "kotak", pakai
`--line-hairline` + radius kecil. Untuk emphasize, pakai garis gold 1px, bukan warna solid.

### 2.3 Bayangan

Bayangan selalu di-tint ke warna tinta hangat, tidak pernah hitam netral.

| Token | Nilai |
| --- | --- |
| `--shadow-xs` | `0 2px 8px rgba(58, 46, 42, .05)` |
| `--shadow-sm` | `0 6px 20px rgba(58, 46, 42, .07)` |
| `--shadow-md` | `0 14px 38px rgba(58, 46, 42, .09)` |
| `--shadow-lift` | `0 22px 58px rgba(58, 46, 42, .12)` |
| `--shadow-inset-paper` | `inset 0 1px 0 rgba(255, 255, 255, .7)` |

### 2.4 Rasio kontras (WCAG)

Diperiksa terhadap `--paper` `#FDFAF4`:

| Warna | Rasio | Izinkan |
| --- | --- | --- |
| `--ink` | 11.4 : 1 | AAA, semua ukuran |
| `--ink-soft` | 6.2 : 1 | AA semua ukuran |
| `--sage-deep` | 4.6 : 1 | AA semua ukuran |
| `--ink-muted` | 3.3 : 1 | **Hanya** ≥ 24px atau metadata dekoratif |
| `--rose` | 3.1 : 1 | **Hanya** non-teks (garis, ikon) atau ≥ 24px bold |
| `--rose-deep` | 5.3 : 1 | AA semua ukuran |
| `--gold` | 2.4 : 1 | **Hanya** non-teks |

**Aturan keras:** teks kecil tidak boleh `--rose` atau `--gold`. Rose teks → `--rose-deep`.

---

## 3. Typography

Tiga keluarga, tiga peran. Tidak ada peran keempat.

| Peran | Family | Dipakai untuk |
| --- | --- | --- |
| Script | **Pinyon Script** | Nama pasangan, monogram, angka section yang beresolusi, quote |
| Serif | **Cormorant Garamond** | Heading, judul section, body panjang, angka countdown |
| Sans | **Jost** | Label kecil-caps, tombol, form, navigasi, metadata |

Kenapa Pinyon Script dan bukan Great Vibes / Pacifico: Pinyon adalah script copperplate
(formal, seperti tulisan pena) sehingga terbaca sebagai "romantis" tanpa terbaca sebagai
"undangan generik yang banyak beredar". Great Vibes sudah ada di source lama dan **dihapus**.

### 3.1 Fluid scale

Semua ukuran berbasis `clamp()`. Jangan pernah menulis ukuran font dalam px.

| Token | clamp() | Family | Case |
| --- | --- | --- | --- |
| `--fs-display-xl` | `clamp(3.4rem, 13vw, 8.5rem)` | Script | Sentence |
| `--fs-display-l` | `clamp(2.5rem, 7.5vw, 4.75rem)` | Script | Sentence |
| `--fs-display-m` | `clamp(2rem, 4.6vw, 3.1rem)` | Serif | Sentence |
| `--fs-heading-l` | `clamp(1.55rem, 3.2vw, 2.3rem)` | Serif | Sentence |
| `--fs-heading-m` | `clamp(1.2rem, 2.1vw, 1.5rem)` | Serif | Sentence |
| `--fs-heading-s` | `clamp(1.05rem, 1.6vw, 1.175rem)` | Serif | Sentence |
| `--fs-body` | `clamp(1rem, .95rem + .25vw, 1.0625rem)` | Serif | Sentence |
| `--fs-body-lg` | `clamp(1.1rem, 1rem + .5vw, 1.3rem)` | Serif | Sentence |
| `--fs-label` | `0.75rem` | Sans | Uppercase |
| `--fs-meta` | `0.8125rem` | Sans | Sentence |
| `--fs-numeral` | `clamp(2.4rem, 5vw, 3.4rem)` | Serif | Sentence |

### 3.2 Line height & tracking

| Token | Nilai | Pairing |
| --- | --- | --- |
| `--lh-script` | `1.05` | Script — selalu tighter, tanpa pengecualian |
| `--lh-tight` | `1.18` | Display & heading |
| `--lh-snug` | `1.4` | Heading kecil |
| `--lh-body` | `1.75` | Body — long measure,katup-serif |
| `--lh-label` | `1.3` | Label |
| `--tr-label` | `0.28em` | Label — dan `--tr-script: .02em` untuk script |

### 3.3 Measure

Paragraf body maksimum **62ch**. Script display tidak boleh lebih dari **2 baris**; kalau
mulai 3 baris, itu salah proporsi, bukan salah font.

---

## 4. Spacing

Base **4px**. Scale below sudah final — tidak boleh ada angka spacing lain di luar scale ini.

`--space-1` 4 · `--space-2` 8 · `--space-3` 12 · `--space-4` 16 · `--space-5` 20
`--space-6` 24 · `--space-8` 32 · `--space-10` 40 · `--space-12` 48 · `--space-16` 64
`--space-20` 80 · `--space-24` 96 · `--space-32` 128

Fluid:
- `--gutter`: `clamp(1.25rem, 5vw, 3.5rem)` — padding horizontal halaman
- `--section-y`: `clamp(4.5rem, 11vw, 9rem)` — padding vertical section
- `--measure-content`: `min(100%, 68rem)` — lebar konten maksimum

**Aturan ritme:** jarak antar-bagian 2× jarak antar-elemen di dalam bagian.
Section boleh `null` jika memang "wall" — tapi butuh alasan naratif.

---

## 5. Radius

Kecil dan tegas. Ini bukan pasar, radius besar bikin kelihatan seperti SaaS.

| Token | Nilai | Pakai untuk |
| --- | --- | --- |
| `--radius-xs` | `2px` | Tag, chip |
| `--radius-sm` | `4px` | Input, tombol |
| `--radius-md` | `8px` | Kartu kecil, thumbnail |
| `--radius-lg` | `14px` | Kartu besar, panel |
| `--radius-pill` | `999px` | Avatar, dot status saja |

---

## 6. Ornamen

Ornamen **hanya line art, 1px, warna `--gold` atau `--line-rose`.** Tidak ada ikon filled,
tidak ada emoji, tidak ada ilustrasi warna.

| Token | Aset | Dipakai di |
| --- | --- | --- |
| `--orn-sprig` | `assets/ornaments/sprig-divider.svg` | Pembatas antar heading, setelah quote |
| `--orn-corner` | `assets/ornaments/corner-bloom.svg` | Sudut cover & closing, diputar 90°/180°/270° |
| `--orn-frame` | `assets/ornaments/filigree-frame.svg` | Bingkai monogram, bingkai foto utama |
| `--orn-leaf` | `assets/ornaments/leaf-pair.svg` | Separator kecil, bullet list |

**Aturan kepadatan:** satu screen maksimal **satu** ornamen besar. Kalau dua, itu ramai.
Ornamen tidak pernah punya warna sendiri selain gold/rose — dia selalu "meminjam" warna
dari palet.

---

## 7. Signature Element — Botanical Signature Transition

Ini pembeda utama website ini dari marketplace.

**Definisi:** setiap perpindahan antar-section diberi satu garis botanical (vine) yang
*gambar diri* dari kiri ke kanan saat section masuk viewport, dengan daun yang muncul
berurutan mengikuti arah gambar. Vine kecil, tidak besar, dan tidak menutupi konten.

**Kenapa ini dipilih:** murah, tapi dampaknya besar, dan konsisten — orang melihat pola yang sama
lima kali tanpa ikut menyadarinya, lalu footer itulah yang membuat mereka ingat.

### 7.1 Varian

| Varian | Posisi | Penggunaan |
| --- | --- | --- |
| `.sig--center` | tengah, lebar 320px | Section memutar, gap naratif |
| `.sig--left` | rata kiri | Awal section, sebelum heading |
| `.sig--bleed` | lebar penuh, keluar dari margin | Transisi besar: opening→invitation, gift→closing |
| `.sig--stack` | vertikal | Pemisah timeline antar item |

### 7.2 Parameter

| Token | Default | Arti |
| --- | --- | --- |
| `--sig-duration` | `1400ms` | Durasi gambar vine |
| `--sig-leaf-gap` | `90ms` | Jeda antar daun |
| `--sig-ease` | `cubic-bezier(.33, 0, .2, 1)` | Slow-in, smooth-out |
| `--sig-stroke` | `var(--gold)` | Warna garis |

### 7.3 Aturan main
- Dengan `prefers-reduced-motion`: vine langsung tampil penuh, tanpa animasi.
- Daun muncul dengan `scale(.2) → scale(1)` + opacity, stagger mengikuti posisi horizontal.
- Total durasi satu transisi dibatasi **2.4 detik**. Kalau terasa lambat, itu salah
  `--sig-duration`, bukan tanda "lebih dramatis".
- Transisi dipicu `IntersectionObserver` threshold `0.45`, sekali saja, tidak berulang.

Implementasi: `css/signature-transition.css` + `js/signature-transition.js`

---

## 8. Motion

Tidak ada bounce, tidak ada spin. Semua gerak masuk dan keluar **perlambat**.

| Token | Nilai | Pakai untuk |
| --- | --- | --- |
| `--dur-in` | `240ms` | Hover, focus, state berubah |
| `--dur-base` | `480ms` | Reveal elemen, transisi state |
| `--dur-slow` | `900ms` | Transisi section besar |
| `--dur-sig` | `1400ms` | Signature transition |
| `--ease-out` | `cubic-bezier(.22, .61, .36, 1)` | Default |
| `--ease-in-out` | `cubic-bezier(.65, 0, .35, 1)` | Masuk & keluar |
| `--ease-soft` | `cubic-bezier(.33, 0, .2, 1)` | Botanical |

**Aturan:** stagger antar-elemen maksimal 4 item. Item ke-5+ muncul bersamaan dengan
yang ke-4 — bukan Bottleneck delay yang bikin orang)nunggu.

---

## 9. Tombol

Tiga variasi, tidak ada tombol keempat.

| Token | Bentuk | Ukuran |
| --- | --- | --- |
| `.btn--primary` | Border 1px `--line-rose`, transparan, teks `--ink` | `padding: 1rem 2.25rem`, radius `--radius-sm` |
| `.btn--ghost` | Tanpa border, teks `--rose-deep` dengan underline anim | Sama |
| `.btn--fill` | Latar `--ink`, teks `--paper` | Sama, untuk CTA tunggal per layar |

Hover: `background: var(--blush-soft)`, transisi `--dur-in` `--ease-out`.
Tidak ada `transform: scale()`, tidak ada `translateY` pada tombol.

---

## 10. Elevation layer

Aturan z-index sebagai token, bukan angka telanjang.

`--z-base` 0 · `--z-raised` 10 · `--z-sticky` 100 · `--z-overlay` 200 · `--z-modal` 300 · `--z-toast` 400

---

## 11. Photo style directive

Foto wajib memenuhi ini supaya galeri terasa satu authorship:

- Crop **3:4 portrait** untuk potret, **4:5** untuk editorial, **16:9** untuk venue lebar
- Cahaya natural atau golden hour. Tidak ada flash onboard, tidak ada filter cooler
- Warm grade ringan (±5% warm). Tidak ada preset yang merusak warna kulit
- Agar menyatu dengan ivory: di UI, setiap foto dapat `filter: saturate(.92) contrast(1.02)`
  supaya menyatu dengan palet, bukan ditempel
- Caption selalu `--fs-meta` `--ink-muted`, italic serif

SUntil data asli tersedia, komponen harus **image-independent**: tinggi area foto pakai
`aspect-ratio`, `background: var(--paper-deep)`, plus shimmer placeholder. Ganti foto
nanti tidak boleh menyebabkan layout shift.

---

## 12. Checklist sebelum masuk Phase 02

- [x] Palet terdefinisi + rasio kontras tercatat
- [x] Fluid type scale, 3 keluarga
- [x] Spacing scale base 4px
- [x] Radius kecil
- [x] Ornamen line-art 1px
- [x] Signature transition terdefinisi + diimplementasikan
- [x] Motion language (no bounce, 3 durasi)
- [x] Photo style directive
- [ ] Identitas pasangan (blocked — butuh data user)
- [ ] Asset foto asli (blocked — butuh upload user)

Phase 02 (Information Architecture) **boleh dimulai** begitu review visual halaman
showcase disetujui. Identitas pasangan tidak menghalangi IA.

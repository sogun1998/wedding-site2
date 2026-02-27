export const data = {
    bride: {
        L: {
            id: 1,
            name: 'Đức Anh',
            child: 'chú rể',
            father: 'Nguyễn Văn Tuấn',
            mother: 'Phạm Thị Dự',
            image: './src/assets/images/cowo.png'
        },
        P: {
            id: 2,
            name: 'Phạm Thanh',
            child: 'cô dâu',
            father: 'Phạm Đức Mạnh',
            mother: 'Trần Thị Phương',
            image: './src/assets/images/cewe.png'
        },

        couple: './src/assets/images/couple.png'
    },

    time: {
        marriage: {
            year: '2026',
            month: 'March',
            date: '21',
            day: 'Saturday',
            hours: {
                start: '17:00',
            },
            address: 'Số 100, Đẩu Vũ 3, phường Phù Liễn, TP Hải Phòng',
            map: 'https://maps.app.goo.gl/1wa3EKgkmZsdh6mz6'
        },
        reception: {
            year: '2026',
            month: 'March',
            date: '22',
            day: 'Sunday',
            hours: {
                start: '11:00',
            },
            address: 'Số 1 Trần Tất Văn, phường Phù Liễn, TP Hải Phòng',
            map: 'https://maps.app.goo.gl/Eb1gy26VDebdPmt58'
        },
    },

    link: {
        calendar: 'https://calendar.app.google/SiMrcGPe9KNDnY7E9',
    },

    galeri: [
        {
            id: 1,
            image: './src/assets/images/1.png'
        },
        {
            id: 2,
            image: './src/assets/images/2.png'
        },
        {
            id: 3,
            image: './src/assets/images/3.png'
        },
        {
            id: 4,
            image: './src/assets/images/4.png'
        },
        {
            id: 5,
            image: './src/assets/images/5.png'
        }
    ],

    bank: [
        {
            id: 1,
            name: 'PHAM THI THANH',
            prefix_name: 'Cô dâu',
            icon: './src/assets/images/bca.png',
            rekening: '12345678'
        },
        {
            id: 2,
            name: 'NGUYEN DUC ANH',
            prefix_name: 'Chú rể',
            icon: './src/assets/images/bri.png',
            rekening: '12345678'
        },
    ],

    audio: './src/assets/audio/wedding.mp3',

    api: 'https://script.google.com/macros/s/AKfycbyydz6N4p2VWUG8zsXeURv6ap9RP8a4eC3x6N3x6qTDjMVr1cIBz9S0NsHw2rWvBOSXGg/exec',

    navbar: [
        {
            id: 1,
            teks: 'Home',
            icon: 'bx bxs-home-heart',
            path: '#home',
        },
        {
            id: 2,
            teks: 'Mempelai',
            icon: 'bx bxs-group',
            path: '#bride',
        },
        {
            id: 3,
            teks: 'Tanggal',
            icon: 'bx bxs-calendar-check',
            path: '#time',
        },
        {
            id: 4,
            teks: 'Galeri',
            icon: 'bx bxs-photo-album',
            path: '#galeri',
        },
        {
            id: 5,
            teks: 'Ucapan',
            icon: 'bx bxs-message-rounded-dots',
            path: '#wishas',
        },
    ],
}

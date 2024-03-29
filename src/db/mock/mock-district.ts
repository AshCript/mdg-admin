const districts = [
  {
    "0": 1,
    "1": "Ambohidratrimo",
    "2": 1,
    "id": 1,
    "name": "Ambohidratrimo",
    "regionId": 1
  },
  {
    "0": 2,
    "1": "Andramasina",
    "2": 1,
    "id": 2,
    "name": "Andramasina",
    "regionId": 1
  },
  {
    "0": 3,
    "1": "Anjozorobe",
    "2": 1,
    "id": 3,
    "name": "Anjozorobe",
    "regionId": 1
  },
  {
    "0": 4,
    "1": "Ankazobe",
    "2": 1,
    "id": 4,
    "name": "Ankazobe",
    "regionId": 1
  },
  {
    "0": 5,
    "1": "Antananarivo-Atsimondrano",
    "2": 1,
    "id": 5,
    "name": "Antananarivo-Atsimondrano",
    "regionId": 1
  },
  {
    "0": 6,
    "1": "Antananarivo-Avaradrano",
    "2": 1,
    "id": 6,
    "name": "Antananarivo-Avaradrano",
    "regionId": 1
  },
  {
    "0": 7,
    "1": "Antananarivo I",
    "2": 1,
    "id": 7,
    "name": "Antananarivo I",
    "regionId": 1
  },
  {
    "0": 8,
    "1": "Antananarivo II",
    "2": 1,
    "id": 8,
    "name": "Antananarivo II",
    "regionId": 1
  },
  {
    "0": 9,
    "1": "Antananarivo III",
    "2": 1,
    "id": 9,
    "name": "Antananarivo III",
    "regionId": 1
  },
  {
    "0": 10,
    "1": "Antananarivo IV",
    "2": 1,
    "id": 10,
    "name": "Antananarivo IV",
    "regionId": 1
  },
  {
    "0": 11,
    "1": "Antananarivo V",
    "2": 1,
    "id": 11,
    "name": "Antananarivo V",
    "regionId": 1
  },
  {
    "0": 12,
    "1": "Antananarivo VI",
    "2": 1,
    "id": 12,
    "name": "Antananarivo VI",
    "regionId": 1
  },
  {
    "0": 13,
    "1": "Manjakandriana",
    "2": 1,
    "id": 13,
    "name": "Manjakandriana",
    "regionId": 1
  },
  {
    "0": 14,
    "1": "Fenoarivobe",
    "2": 2,
    "id": 14,
    "name": "Fenoarivobe",
    "regionId": 2
  },
  {
    "0": 15,
    "1": "Tsiroanomandidy",
    "2": 2,
    "id": 15,
    "name": "Tsiroanomandidy",
    "regionId": 2
  },
  {
    "0": 16,
    "1": "Arivonimamo",
    "2": 3,
    "id": 16,
    "name": "Arivonimamo",
    "regionId": 3
  },
  {
    "0": 17,
    "1": "Miarinarivo",
    "2": 3,
    "id": 17,
    "name": "Miarinarivo",
    "regionId": 3
  },
  {
    "0": 18,
    "1": "Soavinandriana",
    "2": 3,
    "id": 18,
    "name": "Soavinandriana",
    "regionId": 3
  },
  {
    "0": 19,
    "1": "Ambatolampy",
    "2": 4,
    "id": 19,
    "name": "Ambatolampy",
    "regionId": 4
  },
  {
    "0": 20,
    "1": "Antanifotsy",
    "2": 4,
    "id": 20,
    "name": "Antanifotsy",
    "regionId": 4
  },
  {
    "0": 21,
    "1": "Antsirabe I",
    "2": 4,
    "id": 21,
    "name": "Antsirabe I",
    "regionId": 4
  },
  {
    "0": 22,
    "1": "Antsirabe II",
    "2": 4,
    "id": 22,
    "name": "Antsirabe II",
    "regionId": 4
  },
  {
    "0": 23,
    "1": "Betafo",
    "2": 4,
    "id": 23,
    "name": "Betafo",
    "regionId": 4
  },
  {
    "0": 24,
    "1": "Faratsiho",
    "2": 4,
    "id": 24,
    "name": "Faratsiho",
    "regionId": 4
  },
  {
    "0": 25,
    "1": "Mandoto",
    "2": 4,
    "id": 25,
    "name": "Mandoto",
    "regionId": 4
  },
  {
    "0": 26,
    "1": "Ambanja",
    "2": 5,
    "id": 26,
    "name": "Ambanja",
    "regionId": 5
  },
  {
    "0": 27,
    "1": "Ambilobe",
    "2": 5,
    "id": 27,
    "name": "Ambilobe",
    "regionId": 5
  },
  {
    "0": 28,
    "1": "Antsiranana I",
    "2": 5,
    "id": 28,
    "name": "Antsiranana I",
    "regionId": 5
  },
  {
    "0": 29,
    "1": "Antsiranana II",
    "2": 5,
    "id": 29,
    "name": "Antsiranana II",
    "regionId": 5
  },
  {
    "0": 30,
    "1": "Nosy-Be",
    "2": 5,
    "id": 30,
    "name": "Nosy-Be",
    "regionId": 5
  },
  {
    "0": 31,
    "1": "Andapa",
    "2": 6,
    "id": 31,
    "name": "Andapa",
    "regionId": 6
  },
  {
    "0": 32,
    "1": "Antalaha",
    "2": 6,
    "id": 32,
    "name": "Antalaha",
    "regionId": 6
  },
  {
    "0": 33,
    "1": "Sambava",
    "2": 6,
    "id": 33,
    "name": "Sambava",
    "regionId": 6
  },
  {
    "0": 34,
    "1": "Vohémar",
    "2": 6,
    "id": 34,
    "name": "Vohémar",
    "regionId": 6
  },
  {
    "0": 35,
    "1": "Ambatofinandrahana",
    "2": 7,
    "id": 35,
    "name": "Ambatofinandrahana",
    "regionId": 7
  },
  {
    "0": 36,
    "1": "Ambositra",
    "2": 7,
    "id": 36,
    "name": "Ambositra",
    "regionId": 7
  },
  {
    "0": 37,
    "1": "Fandriana",
    "2": 7,
    "id": 37,
    "name": "Fandriana",
    "regionId": 7
  },
  {
    "0": 38,
    "1": "Manandriana",
    "2": 7,
    "id": 38,
    "name": "Manandriana",
    "regionId": 7
  },
  {
    "0": 39,
    "1": "Befotaka Sud",
    "2": 8,
    "id": 39,
    "name": "Befotaka Sud",
    "regionId": 8
  },
  {
    "0": 40,
    "1": "Farafangana",
    "2": 8,
    "id": 40,
    "name": "Farafangana",
    "regionId": 8
  },
  {
    "0": 41,
    "1": "Midongy Sud",
    "2": 8,
    "id": 41,
    "name": "Midongy Sud",
    "regionId": 8
  },
  {
    "0": 42,
    "1": "Vangaindrano",
    "2": 8,
    "id": 42,
    "name": "Vangaindrano",
    "regionId": 8
  },
  {
    "0": 43,
    "1": "Vondrozo",
    "2": 8,
    "id": 43,
    "name": "Vondrozo",
    "regionId": 8
  },
  {
    "0": 44,
    "1": "Ambalavao",
    "2": 9,
    "id": 44,
    "name": "Ambalavao",
    "regionId": 9
  },
  {
    "0": 45,
    "1": "Ambohimahasoa",
    "2": 9,
    "id": 45,
    "name": "Ambohimahasoa",
    "regionId": 9
  },
  {
    "0": 46,
    "1": "Fianarantsoa",
    "2": 9,
    "id": 46,
    "name": "Fianarantsoa",
    "regionId": 9
  },
  {
    "0": 47,
    "1": "Ikalamavony",
    "2": 9,
    "id": 47,
    "name": "Ikalamavony",
    "regionId": 9
  },
  {
    "0": 48,
    "1": "Isandra",
    "2": 9,
    "id": 48,
    "name": "Isandra",
    "regionId": 9
  },
  {
    "0": 49,
    "1": "Lalangina",
    "2": 9,
    "id": 49,
    "name": "Lalangina",
    "regionId": 9
  },
  {
    "0": 50,
    "1": "Vohibato",
    "2": 9,
    "id": 50,
    "name": "Vohibato",
    "regionId": 9
  },
  {
    "0": 51,
    "1": "Iakora",
    "2": 10,
    "id": 51,
    "name": "Iakora",
    "regionId": 10
  },
  {
    "0": 52,
    "1": "Ihosy",
    "2": 10,
    "id": 52,
    "name": "Ihosy",
    "regionId": 10
  },
  {
    "0": 53,
    "1": "Ivohibe",
    "2": 10,
    "id": 53,
    "name": "Ivohibe",
    "regionId": 10
  },
  {
    "0": 54,
    "1": "Ifanadiana",
    "2": 11,
    "id": 54,
    "name": "Ifanadiana",
    "regionId": 11
  },
  {
    "0": 55,
    "1": "Ikongo",
    "2": 11,
    "id": 55,
    "name": "Ikongo",
    "regionId": 11
  },
  {
    "0": 56,
    "1": "Manakara",
    "2": 11,
    "id": 56,
    "name": "Manakara",
    "regionId": 11
  },
  {
    "0": 57,
    "1": "Mananjary",
    "2": 11,
    "id": 57,
    "name": "Mananjary",
    "regionId": 11
  },
  {
    "0": 58,
    "1": "Nosy Varika",
    "2": 11,
    "id": 58,
    "name": "Nosy Varika",
    "regionId": 11
  },
  {
    "0": 59,
    "1": "Vohipeno",
    "2": 11,
    "id": 59,
    "name": "Vohipeno",
    "regionId": 11
  },
  {
    "0": 60,
    "1": "Kandreho",
    "2": 12,
    "id": 60,
    "name": "Kandreho",
    "regionId": 12
  },
  {
    "0": 61,
    "1": "Maevatanàna",
    "2": 12,
    "id": 61,
    "name": "Maevatanàna",
    "regionId": 12
  },
  {
    "0": 62,
    "1": "Tsaratanàna",
    "2": 12,
    "id": 62,
    "name": "Tsaratanàna",
    "regionId": 12
  },
  {
    "0": 63,
    "1": "Ambato Boeny",
    "2": 13,
    "id": 63,
    "name": "Ambato Boeny",
    "regionId": 13
  },
  {
    "0": 64,
    "1": "Mahajanga I",
    "2": 13,
    "id": 64,
    "name": "Mahajanga I",
    "regionId": 13
  },
  {
    "0": 65,
    "1": "Mahajanga II",
    "2": 13,
    "id": 65,
    "name": "Mahajanga II",
    "regionId": 13
  },
  {
    "0": 66,
    "1": "Marovoay",
    "2": 13,
    "id": 66,
    "name": "Marovoay",
    "regionId": 13
  },
  {
    "0": 67,
    "1": "Mitsinjo",
    "2": 13,
    "id": 67,
    "name": "Mitsinjo",
    "regionId": 13
  },
  {
    "0": 68,
    "1": "Soalala",
    "2": 13,
    "id": 68,
    "name": "Soalala",
    "regionId": 13
  },
  {
    "0": 69,
    "1": "Ambatomainty",
    "2": 14,
    "id": 69,
    "name": "Ambatomainty",
    "regionId": 14
  },
  {
    "0": 70,
    "1": "Antsalova",
    "2": 14,
    "id": 70,
    "name": "Antsalova",
    "regionId": 14
  },
  {
    "0": 71,
    "1": "Besalampy",
    "2": 14,
    "id": 71,
    "name": "Besalampy",
    "regionId": 14
  },
  {
    "0": 72,
    "1": "Maintirano",
    "2": 14,
    "id": 72,
    "name": "Maintirano",
    "regionId": 14
  },
  {
    "0": 73,
    "1": "Morafenobe",
    "2": 14,
    "id": 73,
    "name": "Morafenobe",
    "regionId": 14
  },
  {
    "0": 74,
    "1": "Analalava",
    "2": 15,
    "id": 74,
    "name": "Analalava",
    "regionId": 15
  },
  {
    "0": 75,
    "1": "Antsohihy",
    "2": 15,
    "id": 75,
    "name": "Antsohihy",
    "regionId": 15
  },
  {
    "0": 76,
    "1": "Bealanana",
    "2": 15,
    "id": 76,
    "name": "Bealanana",
    "regionId": 15
  },
  {
    "0": 77,
    "1": "Befandriana Nord",
    "2": 15,
    "id": 77,
    "name": "Befandriana Nord",
    "regionId": 15
  },
  {
    "0": 78,
    "1": "Mampikony",
    "2": 15,
    "id": 78,
    "name": "Mampikony",
    "regionId": 15
  },
  {
    "0": 79,
    "1": "Mandritsara",
    "2": 15,
    "id": 79,
    "name": "Mandritsara",
    "regionId": 15
  },
  {
    "0": 80,
    "1": "Port Berger",
    "2": 15,
    "id": 80,
    "name": "Port Berger",
    "regionId": 15
  },
  {
    "0": 81,
    "1": "Ambatondrazaka",
    "2": 16,
    "id": 81,
    "name": "Ambatondrazaka",
    "regionId": 16
  },
  {
    "0": 82,
    "1": "Amparafaravola",
    "2": 16,
    "id": 82,
    "name": "Amparafaravola",
    "regionId": 16
  },
  {
    "0": 83,
    "1": "Andilamena",
    "2": 16,
    "id": 83,
    "name": "Andilamena",
    "regionId": 16
  },
  {
    "0": 84,
    "1": "Anosibe An_ala",
    "2": 16,
    "id": 84,
    "name": "Anosibe An_ala",
    "regionId": 16
  },
  {
    "0": 85,
    "1": "Moramanga",
    "2": 16,
    "id": 85,
    "name": "Moramanga",
    "regionId": 16
  },
  {
    "0": 86,
    "1": "Fenerive Est",
    "2": 17,
    "id": 86,
    "name": "Fenerive Est",
    "regionId": 17
  },
  {
    "0": 87,
    "1": "Mananara Nord",
    "2": 17,
    "id": 87,
    "name": "Mananara Nord",
    "regionId": 17
  },
  {
    "0": 88,
    "1": "Maroantsetra",
    "2": 17,
    "id": 88,
    "name": "Maroantsetra",
    "regionId": 17
  },
  {
    "0": 89,
    "1": "Sainte-Marie",
    "2": 17,
    "id": 89,
    "name": "Sainte-Marie",
    "regionId": 17
  },
  {
    "0": 90,
    "1": "Soanierana Ivongo",
    "2": 17,
    "id": 90,
    "name": "Soanierana Ivongo",
    "regionId": 17
  },
  {
    "0": 91,
    "1": "Vavatenina",
    "2": 17,
    "id": 91,
    "name": "Vavatenina",
    "regionId": 17
  },
  {
    "0": 92,
    "1": "Antanambao Manampotsy",
    "2": 18,
    "id": 92,
    "name": "Antanambao Manampotsy",
    "regionId": 18
  },
  {
    "0": 93,
    "1": "Brickaville",
    "2": 18,
    "id": 93,
    "name": "Brickaville",
    "regionId": 18
  },
  {
    "0": 94,
    "1": "Mahanoro",
    "2": 18,
    "id": 94,
    "name": "Mahanoro",
    "regionId": 18
  },
  {
    "0": 95,
    "1": "Marolambo",
    "2": 18,
    "id": 95,
    "name": "Marolambo",
    "regionId": 18
  },
  {
    "0": 96,
    "1": "Toamasina I",
    "2": 18,
    "id": 96,
    "name": "Toamasina I",
    "regionId": 18
  },
  {
    "0": 97,
    "1": "Toamasina II",
    "2": 18,
    "id": 97,
    "name": "Toamasina II",
    "regionId": 18
  },
  {
    "0": 98,
    "1": "Vatomandry",
    "2": 18,
    "id": 98,
    "name": "Vatomandry",
    "regionId": 18
  },
  {
    "0": 99,
    "1": "Ambovombe Androy",
    "2": 19,
    "id": 99,
    "name": "Ambovombe Androy",
    "regionId": 19
  },
  {
    "0": 100,
    "1": "Bekily",
    "2": 19,
    "id": 100,
    "name": "Bekily",
    "regionId": 19
  },
  {
    "0": 101,
    "1": "Beloha",
    "2": 19,
    "id": 101,
    "name": "Beloha",
    "regionId": 19
  },
  {
    "0": 102,
    "1": "Tsihombe",
    "2": 19,
    "id": 102,
    "name": "Tsihombe",
    "regionId": 19
  },
  {
    "0": 103,
    "1": "Amboasary Sud",
    "2": 20,
    "id": 103,
    "name": "Amboasary Sud",
    "regionId": 20
  },
  {
    "0": 104,
    "1": "Betroka",
    "2": 20,
    "id": 104,
    "name": "Betroka",
    "regionId": 20
  },
  {
    "0": 105,
    "1": "Taolagnaro",
    "2": 20,
    "id": 105,
    "name": "Taolagnaro",
    "regionId": 20
  },
  {
    "0": 106,
    "1": "Ampanihy Ouest",
    "2": 21,
    "id": 106,
    "name": "Ampanihy Ouest",
    "regionId": 21
  },
  {
    "0": 107,
    "1": "Ankazoabo-Sud",
    "2": 21,
    "id": 107,
    "name": "Ankazoabo-Sud",
    "regionId": 21
  },
  {
    "0": 108,
    "1": "Benenitra",
    "2": 21,
    "id": 108,
    "name": "Benenitra",
    "regionId": 21
  },
  {
    "0": 109,
    "1": "Beroroha",
    "2": 21,
    "id": 109,
    "name": "Beroroha",
    "regionId": 21
  },
  {
    "0": 110,
    "1": "Betioky-Sud",
    "2": 21,
    "id": 110,
    "name": "Betioky-Sud",
    "regionId": 21
  },
  {
    "0": 111,
    "1": "Morombe",
    "2": 21,
    "id": 111,
    "name": "Morombe",
    "regionId": 21
  },
  {
    "0": 112,
    "1": "Sakaraha",
    "2": 21,
    "id": 112,
    "name": "Sakaraha",
    "regionId": 21
  },
  {
    "0": 113,
    "1": "Toliara I",
    "2": 21,
    "id": 113,
    "name": "Toliara I",
    "regionId": 21
  },
  {
    "0": 114,
    "1": "Toliara II",
    "2": 21,
    "id": 114,
    "name": "Toliara II",
    "regionId": 21
  },
  {
    "0": 115,
    "1": "Belo sur Tsiribihina",
    "2": 22,
    "id": 115,
    "name": "Belo sur Tsiribihina",
    "regionId": 22
  },
  {
    "0": 116,
    "1": "Mahabo",
    "2": 22,
    "id": 116,
    "name": "Mahabo",
    "regionId": 22
  },
  {
    "0": 117,
    "1": "Manja",
    "2": 22,
    "id": 117,
    "name": "Manja",
    "regionId": 22
  },
  {
    "0": 118,
    "1": "Miandrivazo",
    "2": 22,
    "id": 118,
    "name": "Miandrivazo",
    "regionId": 22
  },
  {
    "0": 119,
    "1": "Morondava",
    "2": 22,
    "id": 119,
    "name": "Morondava",
    "regionId": 22
  }
]

export default districts
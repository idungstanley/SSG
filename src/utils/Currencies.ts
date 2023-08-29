interface currencyType {
  code: string;
  country: string;
  currency: string;
  locale: string;
  symbol: string;
  name: string;
}

const currenciesArr: currencyType[] = [
  {
    code: 'us',
    country: 'United States',
    name: 'US Dollar',
    currency: 'USD',
    locale: 'en-US',
    symbol: '$'
  },
  {
    code: 'gb',
    country: 'United Kingdom',
    name: 'British Pound',
    currency: 'GBP',
    locale: 'en-GB',
    symbol: '£'
  },
  {
    code: 'eu',
    country: 'Europe',
    name: 'Euro',
    currency: 'EUR',
    locale: 'eu-eu',
    symbol: '€'
  },

  {
    code: 'al',
    country: 'Albania',
    currency: 'ALL',
    name: 'Albanian Lek',
    locale: 'sq-AL',
    symbol: 'Lek'
  },
  {
    code: 'dz',
    country: 'Algeria',
    name: 'Algerian Dinar',
    currency: 'DZD',
    locale: 'fr-DZ',
    symbol: 'دج'
  },
  {
    code: 'ao',
    country: 'Angola',
    name: 'Angolan Kwanza',
    currency: 'AOA',
    locale: 'ln-AO',
    symbol: 'Kz'
  },
  // {
  //   code: 'aq',
  //   country: 'Antarctica',
  //   currency: 'XCD',
  //   locale: 'en-US',
  //   symbol: '$'
  // },
  // {
  //   code: 'ag',
  //   country: 'Antigua and Barbuda',
  //   currency: 'XCD',
  //   locale: 'en-AG',
  //   symbol: '$'
  // },
  {
    code: 'ar',
    country: 'Argentina',
    name: 'Argentine Peso',
    currency: 'ARS',
    locale: 'es-AR',
    symbol: '$'
  },
  {
    code: 'am',
    country: 'Armenia',
    name: 'Armenian Dram',
    currency: 'AMD',
    locale: 'hy-AM',
    symbol: '֏'
  },
  {
    code: 'an',
    country: 'Netherlands Antilles',
    name: 'Netherlands Antillean Guilder ',
    currency: 'ANG',
    locale: 'nl-NL',
    symbol: 'ƒ'
  },
  {
    code: 'aw',
    country: 'Aruba',
    currency: 'AWG',
    name: 'Aruban Florin',
    locale: 'nl-AW',
    symbol: 'ƒ'
  },
  {
    code: 'au',
    country: 'Australia',
    name: 'Australian Dollar',
    currency: 'AUD',
    locale: 'en-AU',
    symbol: '$'
  },
  // {
  //   code: 'at',
  //   country: 'Austria',
  //   currency: 'EUR',
  //   locale: 'de-AT',
  //   symbol: '€'
  // },
  {
    code: 'az',
    country: 'Azerbaijan',
    name: 'Azerbaijani Manat',
    currency: 'AZN',
    locale: 'az-AZ',
    symbol: 'm'
  },
  // {
  //   code: 'bs',
  //   country: 'Bahamas',
  //   currency: 'BSD',
  //   locale: 'en-BS',
  //   symbol: 'B$'
  // },
  {
    code: 'bh',
    country: 'Bahrain',
    name: 'Bahraini Dinar',
    currency: 'BHD',
    locale: 'ar-BH',
    symbol: '.د.ب'
  },
  {
    code: 'bd',
    country: 'Bangladesh',
    name: 'Bangladeshi Taka',
    currency: 'BDT',
    locale: 'bn-BD',
    symbol: '৳'
  },
  {
    code: 'bb',
    country: 'Barbados',
    name: 'Barbadian Dollar',
    currency: 'BBD',
    locale: 'en-BB',
    symbol: 'Bds$'
  },
  {
    code: 'by',
    country: 'Belarus',
    name: 'Belarusian Ruble',
    currency: 'BYR',
    locale: 'be-BY',
    symbol: 'Br'
  },
  // {
  //   code: 'be',
  //   country: 'Belgium',
  //   currency: 'EUR',
  //   locale: 'nl-BE',
  //   symbol: '€'
  // },
  {
    code: 'bz',
    country: 'Belize',
    name: 'Belize Dollar',
    currency: 'BZD',
    locale: 'en-BZ',
    symbol: '$'
  },
  {
    code: 'bj',
    country: 'Benin',
    name: 'West African CFA Franc',
    currency: 'XOF',
    locale: 'fr-BJ',
    symbol: 'CFA'
  },
  {
    code: 'bm',
    country: 'Bermuda',
    name: 'Bermudan Dollar',
    currency: 'BMD',
    locale: 'en-BM',
    symbol: '$'
  },
  {
    code: 'bt',
    country: 'Bhutan',
    name: 'Bhutanese Ngultrum',
    currency: 'BTN',
    locale: 'dz-BT',
    symbol: 'Nu.'
  },
  {
    code: 'bo',
    country: 'Bolivia',
    name: 'Bolivian Boliviano',
    currency: 'BOB',
    locale: 'es-BO',
    symbol: 'Bs.'
  },
  {
    code: 'ba',
    country: 'Bosnia and Herzegovina',
    name: 'Bosnia-Herzegovina Convertible Mark',
    currency: 'BAM',
    locale: 'hr-BA',
    symbol: 'KM'
  },
  {
    code: 'bw',
    country: 'Botswana',
    name: 'Botswanan Pula',
    currency: 'BWP',
    locale: 'en-BW',
    symbol: 'P'
  },
  // {
  //   code: 'bv',
  //   country: 'Bouvet Island',
  //   name: 'Norwegian Krone',
  //   currency: 'NOK',
  //   locale: 'en-US',
  //   symbol: 'kr'
  // },
  {
    code: 'br',
    country: 'Brazil',
    name: 'Brazilian Real',
    currency: 'BRL',
    locale: 'pt-BR',
    symbol: 'R$'
  },
  {
    code: 'bn',
    country: 'Brunei',
    name: 'Brunei Dollar',
    currency: 'BND',
    locale: 'ms-BN',
    symbol: 'B$'
  },
  {
    code: 'bg',
    country: 'Bulgaria',
    name: 'Bulgarian Lev',
    currency: 'BGN',
    locale: 'bg-BG',
    symbol: 'Лв.'
  },
  // {
  //   code: 'bf',
  //   country: 'Burkina Faso',
  //   currency: 'XOF',
  //   locale: 'fr-BF',
  //   symbol: 'CFA'
  // },
  {
    code: 'bi',
    country: 'Burundi',
    name: 'Burundian Franc',
    currency: 'BIF',
    locale: 'fr-BI',
    symbol: 'FBu'
  },
  {
    code: 'kh',
    country: 'Cambodia',
    name: 'Cambodian Riel',
    currency: 'KHR',
    locale: 'km-KH',
    symbol: 'KHR'
  },
  {
    code: 'ca',
    country: 'Canada',
    name: 'Canadian Dollar',
    currency: 'CAD',
    locale: 'en-CA',
    symbol: '$'
  },
  {
    code: 'cv',
    country: 'Cape Verde',
    name: 'Cape Verdean Escudo',
    currency: 'CVE',
    locale: 'pt-CV',
    symbol: '$'
  },
  {
    code: 'ky',
    country: 'Cayman Islands',
    name: 'Cayman Islands Dollar',
    currency: 'KYD',
    locale: 'en-KY',
    symbol: '$'
  },
  {
    code: 'cf',
    country: 'Central African Republic',
    name: 'Central African CFA Franc',
    currency: 'XAF',
    locale: 'fr-CF',
    symbol: 'FCFA'
  },
  // {
  //   code: 'td',
  //   country: 'Chad',
  //   currency: 'XAF',
  //   locale: 'fr-TD',
  //   symbol: 'FCFA'
  // },
  {
    code: 'cl',
    country: 'Chile',
    name: 'Chilean Peso',
    currency: 'CLP',
    locale: 'es-CL',
    symbol: '$'
  },
  {
    code: 'cn',
    country: 'China',
    name: 'Chinese Yuan',
    currency: 'CNY',
    locale: 'zh-CN',
    symbol: '¥'
  },
  // {
  //   code: 'cx',
  //   country: 'Christmas Island',
  //   currency: 'AUD',
  //   locale: 'en-CX',
  //   symbol: '$'
  // },
  // {
  //   code: 'cc',
  //   country: 'Cocos Islands',
  //   currency: 'AUD',
  //   locale: 'en-CC',
  //   symbol: '$'
  // },
  {
    code: 'co',
    country: 'Colombia',
    name: 'Colombian Peso',
    currency: 'COP',
    locale: 'es-CO',
    symbol: '$'
  },
  {
    code: 'km',
    country: 'Comoros',
    name: 'Comorian Franc',
    currency: 'KMF',
    locale: 'fr-KM',
    symbol: 'CF'
  },
  // {
  //   code: 'ck',
  //   country: 'Cook Islands',
  //   currency: 'NZD',
  //   locale: 'en-CK',
  //   symbol: '$'
  // },
  {
    code: 'cr',
    country: 'Costa Rica',
    name: 'Costa Rican Colón',
    currency: 'CRC',
    locale: 'es-CR',
    symbol: '₡'
  },
  {
    code: 'hr',
    country: 'Croatia',
    name: 'Croatian Kuna',
    currency: 'HRK',
    locale: 'hr-HR',
    symbol: 'kn'
  },
  // {
  //   code: 'cy',
  //   country: 'Cyprus',
  //   currency: 'EUR',
  //   locale: 'el-CY',
  //   symbol: '€'
  // },
  {
    code: 'cz',
    country: 'Czech Republic',
    name: 'Czech Koruna',
    currency: 'CZK',
    locale: 'cs-CZ',
    symbol: 'Kč'
  },
  {
    code: 'cd',
    country: 'Democratic Republic of the Congo',
    name: 'Congolese Franc',
    currency: 'CDF',
    locale: 'fr-CD',
    symbol: 'FC'
  },
  {
    code: 'dk',
    country: 'Denmark',
    name: 'Danish Krone',
    currency: 'DKK',
    locale: 'da-DK',
    symbol: 'Kr.'
  },
  {
    code: 'dj',
    country: 'Djibouti',
    name: 'Djiboutian Franc',
    currency: 'DJF',
    locale: 'fr-DJ',
    symbol: 'Fdj'
  },
  {
    code: 'do',
    country: 'Dominican Republic',
    name: 'Dominican Peso',
    currency: 'DOP',
    locale: 'es-DO',
    symbol: '$'
  },
  {
    code: 'eg',
    country: 'Egypt',
    name: 'Egyptian Pound',
    currency: 'EGP',
    locale: 'ar-EG',
    symbol: 'ج.م'
  },
  {
    code: 'sv',
    country: 'El Salvador',
    name: 'Salvadoran Colón',
    currency: 'SVC',
    locale: 'es-SV',
    symbol: '₡'
  },
  {
    code: 'er',
    country: 'Eritrea',
    name: 'Eritrean Nakfa',
    currency: 'ERN',
    locale: 'ar-ER',
    symbol: 'Nfk'
  },
  // {
  //   code: 'ee',
  //   country: 'Estonia',
  //   currency: 'EUR',
  //   locale: 'et-EE',
  //   symbol: '€'
  // },
  {
    code: 'et',
    country: 'Ethiopia',
    name: 'Ethiopian Birr',
    currency: 'ETB',
    locale: 'am-ET',
    symbol: 'Br'
  },
  {
    code: 'fk',
    country: 'Falkland Islands',
    name: 'Falkland Islands Pound',
    currency: 'FKP',
    locale: 'en-FK',
    symbol: '£'
  },
  // {
  //   code: 'fo',
  //   country: 'Faroe Islands',
  //   currency: 'DKK',
  //   locale: 'fo-FO',
  //   symbol: 'Kr.'
  // },
  {
    code: 'fj',
    country: 'Fiji',
    name: 'Fijian Dollar',
    currency: 'FJD',
    locale: 'en-FJ',
    symbol: 'FJ$'
  },
  // {
  //   code: 'fi',
  //   country: 'Finland',
  //   currency: 'EUR',
  //   locale: 'fi-FI',
  //   symbol: '€'
  // },
  // {
  //   code: 'fr',
  //   country: 'France',
  //   currency: 'EUR',
  //   locale: 'fr-FR',
  //   symbol: '€'
  // },
  // {
  //   code: 'gf',
  //   country: 'French Guiana',
  //   currency: 'EUR',
  //   locale: 'fr-GF',
  //   symbol: '€'
  // },
  // {
  //   code: 'tf',
  //   country: 'French Southern Territories',
  //   currency: 'EUR',
  //   symbol: '€'
  // },
  // {
  //   code: 'ga',
  //   country: 'Gabon',
  //   currency: 'XAF',
  //   locale: 'fr-GA',
  //   symbol: 'FCFA'
  // },
  {
    code: 'gm',
    country: 'Gambia',
    name: 'Gambian Dalasi',
    currency: 'GMD',
    locale: 'en-GM',
    symbol: 'D'
  },
  {
    code: 'ge',
    country: 'Georgia',
    name: 'Georgian Lari',
    currency: 'GEL',
    locale: 'ka-GE',
    symbol: 'ლ'
  },
  // {
  //   code: 'de',
  //   country: 'Germany',
  //   currency: 'EUR',
  //   locale: 'de-DE',
  //   symbol: '€'
  // },
  {
    code: 'gh',
    country: 'Ghana',
    name: 'Ghanaian Cedi',
    currency: 'GHS',
    locale: 'ak-GH',
    symbol: 'GH₵'
  },
  {
    code: 'gi',
    country: 'Gibraltar',
    name: 'Gibraltar Pound',
    currency: 'GIP',
    locale: 'en-GI',
    symbol: '£'
  },
  // {
  //   code: 'gr',
  //   country: 'Greece',
  //   currency: 'EUR',
  //   locale: 'el-GR',
  //   symbol: '€'
  // },
  // {
  //   code: 'gl',
  //   country: 'Greenland',
  //   currency: 'DKK',
  //   locale: 'da-GL',
  //   symbol: 'Kr.'
  // },
  {
    code: 'gd',
    country: 'Eastern Carribean',
    name: 'East Caribbean Dollar',
    currency: 'XCD',
    locale: 'en-GD',
    symbol: '$'
  },
  // {
  //   code: 'gp',
  //   country: 'Guadeloupe',
  //   currency: 'EUR',
  //   locale: 'fr-GP',
  //   symbol: '€'
  // },
  {
    code: 'gn',
    country: 'Guinea',
    name: 'Guinean Franc',
    currency: 'GNF',
    locale: 'fr-GN',
    symbol: 'FG'
  },
  {
    code: 'gy',
    country: 'Guyana',
    name: 'Guyanaese Dollar',
    currency: 'GYD',
    locale: 'en-GY',
    symbol: '$'
  },
  {
    code: 'ht',
    country: 'Haiti',
    currency: 'HTG',
    name: 'Haitian Gourde',
    locale: 'fr-HT',
    symbol: 'G'
  },
  // {
  //   code: 'hm',
  //   country: 'Heard Island and McDonald Islands',
  //   currency: 'AUD',
  //   symbol: '$'
  // },
  {
    code: 'hn',
    country: 'Honduras',
    name: 'Honduran Lempira',
    currency: 'HNL',
    locale: 'es-HN',
    symbol: 'L'
  },
  {
    code: 'hk',
    country: 'Hong Kong',
    name: 'Hong Kong Dollar',
    currency: 'HKD',
    locale: 'en-HK',
    symbol: '$'
  },
  {
    code: 'hu',
    country: 'Hungary',
    name: 'Hungarian Forint',
    currency: 'HUF',
    locale: 'hu-HU',
    symbol: 'Ft'
  },
  {
    code: 'is',
    country: 'Iceland',
    name: 'Icelandic Króna',
    currency: 'ISK',
    locale: 'is-IS',
    symbol: 'kr'
  },
  {
    code: 'in',
    country: 'India',
    name: 'Indian Rupee',
    currency: 'INR',
    locale: 'hi-IN',
    symbol: '₹'
  },
  {
    code: 'id',
    country: 'Indonesia',
    name: 'Indonesian Rupiah',
    currency: 'IDR',
    locale: 'id-ID',
    symbol: 'Rp'
  },
  {
    code: 'ir',
    country: 'Iran',
    currency: 'IRR',
    name: 'Iranian Rial',
    locale: 'fa-IR',
    symbol: '﷼'
  },
  {
    code: 'iq',
    country: 'Iraq',
    name: 'Iraqi Dinar',
    currency: 'IQD',
    locale: 'ar-IQ',
    symbol: 'د.ع'
  },
  // {
  //   code: 'ie',
  //   country: 'Ireland',
  //   currency: 'EUR',
  //   locale: 'en-IE',
  //   symbol: '€'
  // },
  // {
  //   code: 'im',
  //   country: 'Isle of Man',
  //   currency: 'GBP',
  //   locale: 'gv-IM',
  //   symbol: '£'
  // },
  {
    code: 'il',
    country: 'Israel',
    currency: 'ILS',
    name: 'Israeli New Shekel',
    locale: 'he-IL',
    symbol: '₪'
  },
  // {
  //   code: 'it',
  //   country: 'Italy',
  //   currency: 'EUR',
  //   locale: 'it-IT',
  //   symbol: '€'
  // },
  {
    code: 'jm',
    country: 'Jamaica',
    name: 'Jamaican Dollar',
    currency: 'JMD',
    locale: 'en-JM',
    symbol: 'J$'
  },
  {
    code: 'jp',
    country: 'Japan',
    currency: 'JPY',
    name: 'Japanese Yen',
    locale: 'ja-JP',
    symbol: '¥'
  },
  // {
  //   code: 'je',
  //   country: 'Jersey',
  //   currency: 'GBP',
  //   locale: 'en-JE',
  //   symbol: '£'
  // },
  {
    code: 'jo',
    country: 'Jordan',
    name: 'Jordanian Dinar',
    currency: 'JOD',
    locale: 'ar-JO',
    symbol: 'ا.د'
  },
  {
    code: 'kz',
    country: 'Kazakhstan',
    name: 'Kazakhstani Tenge',
    currency: 'KZT',
    locale: 'kk-KZ',
    symbol: 'лв'
  },
  {
    code: 'ke',
    country: 'Kenya',
    currency: 'KES',
    name: 'Kenyan Shilling',
    locale: 'sw-KE',
    symbol: 'KSh'
  },
  // {
  //   code: 'ki',
  //   country: 'Kiribati',
  //   currency: 'AUD',
  //   locale: 'en-KI',
  //   symbol: '$'
  // },
  {
    code: 'kw',
    country: 'Kuwait',
    name: 'Kuwaiti Dinar',
    currency: 'KWD',
    locale: 'ar-KW',
    symbol: 'ك.د'
  },
  {
    code: 'kg',
    country: 'Kyrgyzstan',
    name: 'Kyrgystani Som',
    currency: 'KGS',
    locale: 'ky-KG',
    symbol: 'лв'
  },
  {
    code: 'la',
    country: 'Laos',
    name: 'Laotian Kip',
    currency: 'LAK',
    locale: 'lo-LA',
    symbol: '₭'
  },
  // {
  //   code: 'lv',
  //   country: 'Latvia',
  //   currency: 'EUR',
  //   locale: 'lv-LV',
  //   symbol: '€'
  // },
  {
    code: 'lb',
    country: 'Lebanon',
    name: 'Lebanese Pound',
    currency: 'LBP',
    locale: 'ar-LB',
    symbol: '£'
  },
  {
    code: 'ls',
    country: 'Lesotho',
    name: 'Lesotho Loti',
    currency: 'LSL',
    locale: 'en-LS',
    symbol: 'L'
  },
  {
    code: 'lr',
    country: 'Liberia',
    name: ' Liberian Dollar',
    currency: 'LRD',
    locale: 'en-LR',
    symbol: '$'
  },
  {
    code: 'ly',
    country: 'Libya',
    currency: 'LYD',
    name: 'Libyan Dinar',
    locale: 'ar-LY',
    symbol: 'د.ل'
  },
  // {
  //   code: 'li',
  //   country: 'Liechtenstein',
  //   currency: 'CHF',
  //   locale: 'de-LI',
  //   symbol: 'CHf'
  // },
  // {
  //   code: 'lt',
  //   country: 'Lithuania',
  //   currency: 'EUR',
  //   locale: 'lt-LT',
  //   symbol: '€'
  // },
  // {
  //   code: 'lu',
  //   country: 'Luxembourg',
  //   currency: 'EUR',
  //   locale: 'fr-LU',
  //   symbol: '€'
  // },
  {
    code: 'mk',
    country: 'Macedonia',
    name: 'Macedonian Denar',
    currency: 'MKD',
    locale: 'mk-MK',
    symbol: 'ден'
  },
  {
    code: 'mw',
    country: 'Malawi',
    name: 'Malawian Kwacha',
    currency: 'MWK',
    locale: 'en-MW',
    symbol: 'MK'
  },
  {
    code: 'my',
    country: 'Malaysia',
    name: 'Malaysian Ringgit',
    currency: 'MYR',
    locale: 'ms-MY',
    symbol: 'RM'
  },
  {
    code: 'mv',
    country: 'Maldives',
    name: 'Malaysian Ringgit',
    currency: 'MVR',
    locale: 'dv-MV',
    symbol: 'Rf'
  },
  // {
  //   code: 'ml',
  //   country: 'Mali',
  //   currency: 'XOF',
  //   locale: 'bm-ML',
  //   symbol: 'CFA'
  // },
  // {
  //   code: 'mt',
  //   country: 'Malta',
  //   currency: 'EUR',
  //   locale: 'mt-MT',
  //   symbol: '€'
  // },
  // {
  //   code: 'mq',
  //   country: 'Martinique',
  //   currency: 'EUR',
  //   locale: 'fr-MQ',
  //   symbol: '€'
  // },
  {
    code: 'mr',
    country: 'Mauritania',
    name: 'Mauritanian Ouguiya',
    currency: 'MRO',
    locale: 'fr-MR',
    symbol: 'MRU'
  },
  {
    code: 'mu',
    country: 'Mauritius',
    name: 'Mauritian Rupee',
    currency: 'MUR',
    locale: 'fr-MU',
    symbol: '₨'
  },
  // {
  //   code: 'yt',
  //   country: 'Mayotte',
  //   currency: 'EUR',
  //   locale: 'fr-YT',
  //   symbol: '€'
  // },
  {
    code: 'mx',
    country: 'Mexico',
    currency: 'MXN',
    name: 'Mexican Peso',
    locale: 'es-MX',
    symbol: '$'
  },
  {
    code: 'md',
    country: 'Moldova',
    name: 'Moldovan Leu',
    currency: 'MDL',
    locale: 'ro-MD',
    symbol: 'L'
  },
  // {
  //   code: 'mc',
  //   country: 'Monaco',
  //   currency: 'EUR',
  //   locale: 'fr-MC',
  //   symbol: '€'
  // },
  {
    code: 'mn',
    country: 'Mongolia',
    currency: 'MNT',
    name: 'Mongolian Tugrik',
    locale: 'mn-MN',
    symbol: '₮'
  },
  // {
  //   code: 'me',
  //   country: 'Montenegro',
  //   currency: 'EUR',
  //   locale: 'sr-ME',
  //   symbol: '€'
  // },
  // {
  //   code: 'ms',
  //   country: 'Montserrat',
  //   currency: 'XCD',
  //   locale: 'en-MS',
  //   symbol: '$'
  // },
  {
    code: 'ma',
    country: 'Morocco',
    name: 'Moroccan Dirham',
    currency: 'MAD',
    locale: 'ar-MA',
    symbol: 'MAD'
  },
  {
    code: 'mm',
    country: 'Myanmar',
    name: 'Myanmar Kyat',
    currency: 'MMK',
    locale: 'my-MM',
    symbol: 'K'
  },
  {
    code: 'na',
    country: 'Namibia',
    name: 'Namibian Dollar',
    currency: 'NAD',
    locale: 'af-NA',
    symbol: '$'
  },
  // {
  //   code: 'nr',
  //   country: 'Nauru',
  //   currency: 'AUD',
  //   locale: 'en-NR',
  //   symbol: '$'
  // },
  {
    code: 'np',
    country: 'Nepal',
    name: 'Nepalese Rupee',
    currency: 'NPR',
    locale: 'ne-NP',
    symbol: '₨'
  },
  // {
  //   code: 'nl',
  //   country: 'Netherlands',
  //   currency: 'EUR',
  //   locale: 'nl-NL',
  //   symbol: '€'
  // },
  {
    code: 'nc',
    country: 'New Caledonia',
    name: 'CFP Franc',
    currency: 'XPF',
    locale: 'fr-NC',
    symbol: '₣'
  },
  {
    code: 'nz',
    country: 'New Zealand',
    currency: 'NZD',
    name: 'New Zealand Dollar',
    locale: 'en-NZ',
    symbol: '$'
  },
  {
    code: 'ni',
    country: 'Nicaragua',
    name: 'Nicaraguan Córdoba',
    currency: 'NIO',
    locale: 'es-NI',
    symbol: 'C$'
  },
  // {
  //   code: 'ne',
  //   country: 'Niger',
  //   currency: 'XOF',
  //   locale: 'fr-NE',
  //   symbol: 'CFA'
  // },
  {
    code: 'ng',
    country: 'Nigeria',
    name: 'Nigerian Naira',
    currency: 'NGN',
    locale: 'ig-NG',
    symbol: '₦'
  },
  // {
  //   code: 'nu',
  //   country: 'Niue',
  //   currency: 'NZD',
  //   locale: 'en-NU',
  //   symbol: '$'
  // },
  // {
  //   code: 'nf',
  //   country: 'Norfolk Island',
  //   currency: 'AUD',
  //   locale: 'en-NF',
  //   symbol: '$'
  // },
  {
    code: 'kp',
    country: 'North Korea',
    currency: 'KPW',
    name: 'North Korean Won',
    locale: 'ko-KP',
    symbol: '₩'
  },
  {
    code: 'no',
    country: 'Norway',
    currency: 'NOK',
    name: 'Norwegian Krone',
    locale: 'nb-NO',
    symbol: 'kr'
  },
  {
    code: 'om',
    country: 'Oman',
    currency: 'OMR',
    name: 'Omani Rial',
    locale: 'ar-OM',
    symbol: '.ع.ر'
  },
  {
    code: 'pk',
    country: 'Pakistan',
    currency: 'PKR',
    name: 'Pakistani Rupee',
    locale: 'ur-PK',
    symbol: '₨'
  },
  {
    code: 'pa',
    country: 'Panama',
    name: 'Panamanian Balboa',
    currency: 'PAB',
    locale: 'es-PA',
    symbol: 'B/.'
  },
  {
    code: 'pg',
    country: 'Papua New Guinea',
    currency: 'PGK',
    name: 'Papua New Guinean Kina',
    locale: 'en-PG',
    symbol: 'K'
  },
  {
    code: 'py',
    country: 'Paraguay',
    currency: 'PYG',
    name: 'Paraguayan Guarani',
    locale: 'es-PY',
    symbol: '₲'
  },
  {
    code: 'pe',
    country: 'Peru',
    name: 'Peruvian Sol',
    currency: 'PEN',
    locale: 'es-PE',
    symbol: 'S/.'
  },
  {
    code: 'ph',
    country: 'Philippines',
    name: 'Philippine Piso',
    currency: 'PHP',
    locale: 'en-PH',
    symbol: '₱'
  },
  // {
  //   code: 'pn',
  //   country: 'Pitcairn',
  //   currency: 'NZD',
  //   locale: 'en-PN',
  //   symbol: '$'
  // },
  {
    code: 'pl',
    country: 'Poland',
    currency: 'PLN',
    name: 'Polish Zloty',
    locale: 'pl-PL',
    symbol: 'zł'
  },
  // {
  //   code: 'pt',
  //   country: 'Portugal',
  //   currency: 'EUR',
  //   locale: 'pt-PT',
  //   symbol: '€'
  // },
  {
    code: 'qa',
    country: 'Qatar',
    name: 'Qatari Rial',
    currency: 'QAR',
    locale: 'ar-QA',
    symbol: 'ق.ر'
  },
  // {
  //   code: 'cg',
  //   country: 'Republic of the Congo',
  //   currency: 'XAF',
  //   locale: 'fr-CG',
  //   symbol: 'FCFA'
  // },
  // {
  //   code: 're',
  //   country: 'Reunion',
  //   currency: 'EUR',
  //   locale: 'fr-RE',
  //   symbol: '€'
  // },
  {
    code: 'ro',
    country: 'Romania',
    currency: 'RON',
    name: 'Romanian Leu',
    locale: 'ro-RO',
    symbol: 'lei'
  },
  {
    code: 'ru',
    country: 'Russia',
    currency: 'RUB',
    name: 'Russian Ruble',
    locale: 'ru-RU',
    symbol: '₽'
  },
  {
    code: 'rw',
    country: 'Rwanda',
    name: 'Rwandan Franc',
    currency: 'RWF',
    locale: 'rw-RW',
    symbol: 'FRw'
  },
  {
    code: 'sh',
    country: 'Saint Helena',
    currency: 'SHP',
    name: 'St. Helena Pound',
    locale: 'en-SH',
    symbol: '£'
  },
  // {
  //   code: 'pm',
  //   country: 'Saint Pierre and Miquelon',
  //   currency: 'EUR',
  //   locale: 'fr-PM',
  //   symbol: '€'
  // },
  // {
  //   code: 'vc',
  //   country: 'Saint Vincent and the Grenadines',
  //   currency: 'XCD',
  //   locale: 'en-VC',
  //   symbol: '$'
  // },
  {
    code: 'ws',
    country: 'Samoa',
    currency: 'WST',
    name: 'Samoan Tala',
    locale: 'en-WS',
    symbol: 'SAT'
  },
  // {
  //   code: 'sm',
  //   country: 'San Marino',
  //   currency: 'EUR',
  //   locale: 'it-SM',
  //   symbol: '€'
  // },
  // {
  //   code: 'st',
  //   country: 'Sao Tome and Principe',
  //   currency: 'STD',
  //   locale: 'pt-ST',
  //   symbol: 'Db'
  // },
  {
    code: 'sa',
    country: 'Saudi Arabia',
    name: 'Saudi Riyal',
    currency: 'SAR',
    locale: 'en-SA',
    symbol: '﷼'
  },
  // {
  //   code: 'sn',
  //   country: 'Senegal',
  //   currency: 'XOF',
  //   locale: 'wo-SN',
  //   symbol: 'CFA'
  // },
  {
    code: 'rs',
    country: 'Serbia',
    currency: 'RSD',
    name: 'Serbian Dinar',
    locale: 'sr-RS',
    symbol: 'din'
  },
  {
    code: 'sc',
    country: 'Seychelles',
    currency: 'SCR',
    name: 'Seychellois Rupee',
    locale: 'fr-SC',
    symbol: 'SRe'
  },
  {
    code: 'sl',
    country: 'Sierra Leone',
    currency: 'SLL',
    name: 'Sierra Leonean Leone',
    locale: 'en-SL',
    symbol: 'Le'
  },
  {
    code: 'sg',
    country: 'Singapore',
    currency: 'SGD',
    name: 'Singapore Dollar',
    locale: 'zh-SG',
    symbol: '$'
  },
  // {
  //   code: 'sk',
  //   country: 'Slovakia',
  //   currency: 'EUR',
  //   locale: 'sk-SK',
  //   symbol: '€'
  // },
  // {
  //   code: 'si',
  //   country: 'Slovenia',
  //   currency: 'EUR',
  //   locale: 'sl-SI',
  //   symbol: '€'
  // },
  {
    code: 'sb',
    country: 'Solomon Islands',
    currency: 'SBD',
    name: 'Solomon Islands Dollar',
    locale: 'en-SB',
    symbol: 'Si$'
  },
  {
    code: 'so',
    country: 'Somalia',
    currency: 'SOS',
    name: 'Somali Shilling',
    locale: 'so-SO',
    symbol: 'Sh.so.'
  },
  {
    code: 'za',
    country: 'South Africa',
    currency: 'ZAR',
    name: 'South African Rand',
    locale: 'af-ZA',
    symbol: 'R'
  },
  // {
  //   code: 'gs',
  //   country: 'South Georgia and the South Sandwich Islands',
  //   currency: 'GBP',
  //   symbol: '£'
  // },
  {
    code: 'kr',
    country: 'South Korea',
    currency: 'KRW',
    name: 'South Korean Won',
    locale: 'ko-KR',
    symbol: '₩'
  },
  {
    code: 'ss',
    country: 'South Sudan',
    currency: 'SSP',
    name: 'South Sudanese Pound',
    locale: 'ar-SS',
    symbol: '£'
  },
  // {
  //   code: 'es',
  //   country: 'Spain',
  //   currency: 'EUR',
  //   locale: 'es-ES',
  //   symbol: '€'
  // },
  {
    code: 'lk',
    country: 'Sri Lanka',
    name: 'Sri Lankan Rupee',
    currency: 'LKR',
    locale: 'si-LK',
    symbol: 'Rs'
  },
  {
    code: 'sd',
    country: 'Sudan',
    currency: 'SDG',
    name: 'Sudanese Pound',
    locale: 'ar-SD',
    symbol: '.س.ج'
  },
  {
    code: 'sr',
    country: 'Suriname',
    currency: 'SRD',
    name: 'Surinamese Dollar',
    locale: 'nl-SR',
    symbol: '$'
  },
  {
    code: 'sz',
    country: 'Swaziland',
    currency: 'SZL',
    name: 'Swazi Lilangeni',
    locale: 'en-SZ',
    symbol: 'E'
  },
  {
    code: 'se',
    country: 'Sweden',
    currency: 'SEK',
    name: 'Swedish Krona',
    locale: 'sv-SE',
    symbol: 'kr'
  },
  {
    code: 'ch',
    country: 'Switzerland',
    currency: 'CHF',
    name: 'Swiss Franc',
    locale: 'de-CH',
    symbol: 'CHf'
  },
  {
    code: 'sy',
    country: 'Syria',
    currency: 'SYP',
    name: 'Syrian Pound',
    locale: 'ar-SY',
    symbol: 'LS'
  },
  {
    code: 'tw',
    country: 'Taiwan',
    currency: 'TWD',
    name: 'New Taiwan Dollar',
    locale: 'zh-TW',
    symbol: '$'
  },
  {
    code: 'tj',
    country: 'Tajikistan',
    currency: 'TJS',
    name: 'Tajikistani Somoni',
    locale: 'tg-TJ',
    symbol: 'SM'
  },
  {
    code: 'tz',
    country: 'Tanzania',
    currency: 'TZS',
    name: 'Tajikistani Somoni',
    locale: 'sw-TZ',
    symbol: 'TSh'
  },
  {
    code: 'th',
    country: 'Thailand',
    currency: 'THB',
    name: 'Thai Baht',
    locale: 'th-TH',
    symbol: '฿'
  },
  {
    code: 'to',
    country: 'Tonga',
    name: 'Tongan Paʻanga',
    currency: 'TOP',
    locale: 'to-TO',
    symbol: '$'
  },
  {
    code: 'tt',
    country: 'Trinidad and Tobago',
    name: 'Trinidad & Tobago Dollar',
    currency: 'TTD',
    locale: 'en-TT',
    symbol: '$'
  },
  {
    code: 'tn',
    country: 'Tunisia',
    name: 'Tunisian Dinar',
    currency: 'TND',
    locale: 'ar-TN',
    symbol: 'ت.د'
  },
  {
    code: 'tr',
    country: 'Turkey',
    name: 'Turkish Lira',
    currency: 'TRY',
    locale: 'tr-TR',
    symbol: '₺'
  },
  {
    code: 'tm',
    country: 'Turkmenistan',
    name: 'Turkmenistani Manat',
    currency: 'TMT',
    locale: 'tk-TM',
    symbol: 'T'
  },
  {
    code: 'ug',
    country: 'Uganda',
    name: 'Ugandan Shilling',
    currency: 'UGX',
    locale: 'sw-UG',
    symbol: 'USh'
  },
  {
    code: 'ua',
    country: 'Ukraine',
    currency: 'UAH',
    name: 'Ukrainian Hryvnia',
    locale: 'uk-UA',
    symbol: '₴'
  },
  {
    code: 'ae',
    country: 'United Arab Emirates',
    currency: 'AED',
    name: 'United Arab Emirates Dirham',
    locale: 'en-AE',
    symbol: 'إ.د'
  },
  {
    code: 'uy',
    country: 'Uruguay',
    currency: 'UYU',
    name: 'Uruguayan Peso',
    locale: 'es-UY',
    symbol: '$'
  },
  {
    code: 'uz',
    country: 'Uzbekistan',
    currency: 'UZS',
    name: 'Uzbekistani Som',
    locale: 'uz-UZ',
    symbol: 'лв'
  },
  {
    code: 'vu',
    country: 'Vanuatu',
    name: 'Vanuatu Vatu',
    currency: 'VUV',
    locale: 'en-VU',
    symbol: 'VT'
  },
  {
    code: 've',
    country: 'Venezuela',
    currency: 'VEF',
    name: 'Vanuatu Vatu',
    locale: 'es-VE',
    symbol: 'Bs'
  },
  {
    code: 'vn',
    country: 'Vietnam',
    currency: 'VND',
    name: 'Vietnamese Dong',
    locale: 'vi-VN',
    symbol: '₫'
  },
  {
    code: 'wf',
    country: 'Wallis and Futuna',
    currency: 'XPF',
    name: 'CFP Franc ',
    locale: 'fr-WF',
    symbol: '₣'
  },
  {
    code: 'ye',
    country: 'Yemen',
    currency: 'YER',
    name: 'Yemeni Rial',
    locale: 'ar-YE',
    symbol: '﷼'
  }
];

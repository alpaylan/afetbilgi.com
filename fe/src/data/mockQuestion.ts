const data = {
  type: 'question',
  text: 'Nereden yardımda bulunmak istiyorsunuz?',
  options: [
    {
      name: 'Yurt İçi',
      value: {
        type: 'question',
        text: 'Hangi kurumdan yardım almak istiyorsunuz?',
        options: [
          {
            name: 'AFAD',
            value: {
              type: 'question',
              text: "AFAD'dan yardım almak istiyorsanız, lütfen aşağıdaki seçeneklerden birini seçiniz.",
              options: [
                {
                  name: "AFAD'a bağışta bulun",
                  value: {
                    type: 'data',
                    data: {
                      dataType: 'url-donation',
                      name: 'AFAD',
                      url: 'https://www.afad.gov.tr/',
                    },
                  },
                },
                {
                  name: "AFAD'a SMS ile yardım et",
                  value: {
                    type: 'data',
                    data: {
                      dataType: 'sms-donation',
                      name: 'AFAD',
                      sms: 'DEPREM',
                      number: '1866',
                    },
                  },
                },
                {
                  name: "AFAD'a bağışta bulunmak için banka hesabına para yatır",
                  value: {
                    type: 'data',
                    data: {
                      dataType: 'bank-account-donation',
                      name: 'AFAD',
                      iban: null,
                    },
                  },
                },
                {
                  name: "AFAD'a bağışta bulunmak için kredi kartı ile yardım et",
                  value: {
                    type: 'data',
                    data: {
                      dataType: 'credit-card-donation',
                      name: 'AFAD',
                      url: 'https://www.afad.gov.tr/',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: 'Yurt Dışı URL',
      value: {
        type: 'data',
        data: {
          dataType: 'bank-account-donation',
          name: 'AFAD',
          iban: null,
        },
      },
    },
    {
      name: 'Yurt Dışı Banka',
      value: {
        type: 'data',
        data: {
          dataType: 'credit-card-donation',
          name: 'AFAD',
          url: 'https://www.afad.gov.tr/',
        },
      },
    },
  ],
};

export default data;

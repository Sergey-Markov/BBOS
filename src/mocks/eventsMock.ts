export const EVENTS_DATA = [
  {
    id: '1',
    title: 'Jumping Event',
    description:
      'L, consectetur adipiscing elit. Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices, Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices,  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices, Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices. Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices, Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices, Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices,  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices, Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices. Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices,  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.',
    date: '2021-01-01',
    time: '13:00',
    location: 'Cherkasy',
    image: 'https://picsum.photos/1920/1080',
    about: [
      {
        id: '1',
        name: 'likes',
        count: 155,
        icon: 'thumb-up-outline',
        selectedIcon: 'thumb-up',
        selected: true,
      },
      {
        id: '2',
        name: 'dislikes',
        count: 40,
        icon: 'thumb-down-outline',
        selectedIcon: 'thumb-down',
        selected: false,
      },
      {
        id: '3',
        name: 'comments',
        count: 25,
        icon: 'comment-text-outline',
        selectedIcon: 'comment-text',
        selected: false,
      },
    ],
    comments: [
      {
        id: '1',
        parentId: null,
        userName: 'Valera',
        userId: '1',
        message:
          'loh lohlohlohlohlohlohloh lohlohlohloh lohlohlohlohlohloh lohlohlohlohlohlohlohloh lohlohlohloh lohlohlohlohlohlohloh lohloh lohlohlohlohloh lohlohloh loh lohlohlohloh lohlohloh',
        create_at: '2023-07-17T14:23:30.002Z',
      },
      {
        id: '2',
        parentId: '1',
        userName: 'Lera',
        userId: '2',
        message: 'sam loh',
        create_at: '2023-07-17T14:23:30.002Z',
      },
      {
        id: '3',
        parentId: '1',
        userName: 'Andriy',
        userId: '3',
        message: 'daun',
        create_at: '2023-07-17T14:23:30.002Z',
      },
      {
        id: '4',
        parentId: '5',
        userName: 'Valera',
        userId: '1',
        message: 'it is true',
        create_at: '2023-07-17T14:23:30.002Z',
      },
      {
        id: '5',
        parentId: null,
        userName: 'Andriy',
        userId: '3',
        message: 'may be he is a daun',
        create_at: '2023-07-17T14:23:30.002Z',
      },
      {
        id: '6',
        parentId: '5',
        userName: 'Valera',
        userId: '1',
        message: 'not shure',
        create_at: '2023-07-17T14:23:30.002Z',
      },
    ],
  },
  // {
  //   id: '2',
  //   title: 'Runing Event',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit.    Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices,   Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices,  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.',
  //   date: '2023-06-03',
  //   time: '12:00',
  //   location: 'Cherkasy',
  //   image: 'https://picsum.photos/1920/1080',

  //   about: [
  //     {
  //       id: '1',
  //       name: 'likes',
  //       count: 155,
  //       icon: 'thumb-up-outline',
  //       selectedIcon: 'thumb-up',
  //       selected: true,
  //     },
  //     {
  //       id: '2',
  //       name: 'dislikes',
  //       count: 40,
  //       icon: 'thumb-down-outline',
  //       selectedIcon: 'thumb-down',
  //       selected: false,
  //     },
  //     {
  //       id: '3',
  //       name: 'comments',
  //       count: 25,
  //       icon: 'comment-text-outline',
  //       selectedIcon: 'comment-text',
  //       selected: false,
  //     },
  //   ],
  //   comments: [],
  // },
  // {
  //   id: '3',
  //   title: 'Cleaner Event',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit.    Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices,   Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices,  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.',
  //   date: '2023-08-09',
  //   time: '11:00',
  //   location: 'Cherkasy',
  //   image: 'https://picsum.photos/1920/1080',

  //   about: [
  //     {
  //       id: '1',
  //       name: 'likes',
  //       count: 155,
  //       icon: 'thumb-up-outline',
  //       selectedIcon: 'thumb-up',
  //       selected: true,
  //     },
  //     {
  //       id: '2',
  //       name: 'dislikes',
  //       count: 40,
  //       icon: 'thumb-down-outline',
  //       selectedIcon: 'thumb-down',
  //       selected: false,
  //     },
  //     {
  //       id: '3',
  //       name: 'comments',
  //       count: 25,
  //       icon: 'comment-text-outline',
  //       selectedIcon: 'comment-text',
  //       selected: false,
  //     },
  //   ],
  //   comments: [
  //     {
  //       id: '1',
  //       parentId: null,
  //       userName: 'Valera',
  //       userId: '1',
  //       message: 'great event',
  //       create_at: '2023-07-17T14:23:30.002Z',
  //     },
  //     {
  //       id: '2',
  //       parentId: '1',
  //       userName: 'Lera',
  //       userId: '2',
  //       message: 'look at this',
  //       create_at: '2023-07-17T14:23:30.002Z',
  //     },
  //     {
  //       id: '3',
  //       parentId: null,
  //       userName: 'Andriy',
  //       userId: '3',
  //       message: 'i like it',
  //       create_at: '2023-07-17T14:23:30.002Z',
  //     },
  //     {
  //       id: '4',
  //       parentId: '3',
  //       userName: 'Valera',
  //       userId: '1',
  //       message: 'important event',
  //       create_at: '2023-07-17T14:23:30.002Z',
  //     },
  //   ],
  // },
  // {
  //   id: '4',
  //   title: 'Selebration Victory of Ukraine Event',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit.    Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices,   Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices,  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.  Nulla convallis libero eget nisl ultrices, eget ultrices nisl ultrices.',
  //   date: '2023-08-03',
  //   time: '04:00',
  //   location: 'Cherkasy',
  //   image: 'https://picsum.photos/1920/1080',

  //   about: [
  //     {
  //       id: '1',
  //       name: 'likes',
  //       count: 155,
  //       icon: 'thumb-up-outline',
  //       selectedIcon: 'thumb-up',
  //       selected: true,
  //     },
  //     {
  //       id: '2',
  //       name: 'dislikes',
  //       count: 40,
  //       icon: 'thumb-down-outline',
  //       selectedIcon: 'thumb-down',
  //       selected: false,
  //     },
  //     {
  //       id: '3',
  //       name: 'comments',
  //       count: 25,
  //       icon: 'comment-text-outline',
  //       selectedIcon: 'comment-text',
  //       selected: false,
  //     },
  //   ],
  //   comments: [],
  // },
];

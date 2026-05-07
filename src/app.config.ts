export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/services/index',
    'pages/barbers/index',
    'pages/time/index',
    'pages/confirm/index',
    'pages/appointments/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1f1a17',
    navigationBarTitleText: '拾光男士理发预约',
    navigationBarTextStyle: 'white',
    backgroundColor: '#f7f3ee'
  },
  tabBar: {
    color: '#8a8178',
    selectedColor: '#b9783f',
    backgroundColor: '#fffaf4',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/appointments/index',
        text: '预约'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的'
      }
    ]
  }
})

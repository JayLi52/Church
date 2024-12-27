export const getImageUrl = () => {
  //   return url.replace('http://', 'https://');
  const mockdata = [
    'http://gips1.baidu.com/it/u=2178851102,884542160&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280',
    'https://img1.baidu.com/it/u=853473710,756597061&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
    'https://img2.baidu.com/it/u=3029837478,1144772205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    'https://img1.baidu.com/it/u=2797694726,2591148778&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
    'https://img2.baidu.com/it/u=2222048975,1799254666&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    'https://img1.baidu.com/it/u=1714063279,3713584051&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    'https://img2.baidu.com/it/u=2608756708,3636013038&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
  ];
  return mockdata[Math.floor(Math.random() * mockdata.length)];
};

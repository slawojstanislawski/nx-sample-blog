module.exports = {
  name: 'blog-feature-auth',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/blog/feature-auth',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

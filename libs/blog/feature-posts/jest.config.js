module.exports = {
  name: 'blog-feature-posts',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/blog/feature-posts',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

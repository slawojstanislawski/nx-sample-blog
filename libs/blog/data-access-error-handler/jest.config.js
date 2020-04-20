module.exports = {
  name: 'blog-data-access-error-handler',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/blog/data-access-error-handler',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

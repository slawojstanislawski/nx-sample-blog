module.exports = {
  name: 'shared-error-mapper',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/error-mapper',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

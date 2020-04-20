module.exports = {
  name: 'shared-snackbar',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/snackbar',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

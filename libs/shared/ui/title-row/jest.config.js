module.exports = {
  name: 'shared-ui-title-row',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/ui/title-row',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

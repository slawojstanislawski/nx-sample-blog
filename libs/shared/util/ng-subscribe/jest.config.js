module.exports = {
  name: 'shared-util-ng-subscribe',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/util/ng-subscribe',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

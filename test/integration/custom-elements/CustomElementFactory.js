import assign from 'lodash-es/assign';

import BpmnElementFactory from 'lib/features/modeling/ElementFactory';

import { DEFAULT_LABEL_SIZE } from 'lib/util/LabelUtil';


export default class CustomElementFactory extends BpmnElementFactory {

  constructor(bpmnFactory, moddle, translate) {
    super(bpmnFactory, moddle, translate);
  }

  create(elementType, attrs) {
    var type = attrs.type,
        businessObject,
        size;

    if (elementType === 'label') {
      return super.create(elementType, assign({ type: 'label' }, DEFAULT_LABEL_SIZE, attrs));
    }

    if (/^custom\:/.test(type)) {
      type = attrs.type.replace(/^custom\:/, '');

      businessObject = {};

      size = this._getCustomElementSize(type);

      return super.create(elementType,
        assign({ type: elementType, businessObject: businessObject }, attrs, size));
    }

    return this.createBpmnElement(elementType, attrs);
  }

  /**
   * Sets the *width* and *height* for custom shapes.
   *
   * The following example shows an interface on how
   * to setup the custom element's dimensions.
   *
   * @example
   *
   *  var shapes = {
   *     triangle: { width: 40, height: 40 },
   *     rectangle: { width: 100, height: 20 }
   *  };
   *
   *   return shapes[type];
   *
   *
   * @param  {String} type
   *
   * @return {Bounds} { width, height}
   */
  _getCustomElementSize(type) {
    if (!type) {
      return { width: 100, height: 80 };
    }

    var shapes = {
      triangle: { width: 40, height: 40 },
      circle: { width: 140, height: 140 }
    };

    return shapes[type];
  }

}

CustomElementFactory.$inject = [
  'bpmnFactory',
  'moddle',
  'translate'
];

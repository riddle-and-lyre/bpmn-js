'use strict';

var TestHelper = require('../../../TestHelper');

/* global bootstrapDiagram, inject */


var moveModule = require('../../../../lib/features/move');


describe('features/move', function() {


  describe('bootstrap', function() {

    beforeEach(bootstrapDiagram({ modules: [ moveModule ] }));

    it('should bootstrap diagram with component', inject(function() {

    }));

  });

});
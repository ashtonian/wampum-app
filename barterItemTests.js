var uuid = require('node-uuid');
'use strict';

function getFakeBarterItem() {
    var barterItemId = uuid.v4();
    var item = {
        barterItemId: uuid.v4(),
        userId: 'db8203a5-6bb8-40c9-bcd9-10b4cc92bf25', // TODO: fix
        title: 'integration item',
        description: 'integration test item',
        images: [{
            imageId: uuid.v4(),
            fileExtension: '.jpg'
        }, {
            imageId: uuid.v4(),
            fileExtension: '.png'
        }]
    };
    return item;
}
var barterItems = require('../../../../models/db/dbProvider.js').db.barterItems; // go in through provider

describe('barter item repo', () => {
    'use strict';

    /* TODO:findByUserId, update */
    let currentBarterItems = [];

    it('initializes correctly', done => {
        barterItems.should.not.be.null;
        done();
    });

    it('adds item and finds the item by id', done => {
        let barterItem = getFakeBarterItem();
        currentBarterItems.push(barterItem);
        barterItems.add(barterItem).then(() => {
            return barterItems.find(barterItem.barterItemId)
        }).should.eventually.be.eql(barterItem).notify(done);
    });


    it('adds item and returns itemIds and image ids', done => {
        let barterItem = getFakeBarterItem();
        currentBarterItems.push(barterItem);
        barterItems.add(barterItem).should.eventually.be.eql({
            barterItemId: barterItem.barterItemId,
            imageIds: barterItem.images.map(img => img.imageId)
        }).notify(done);
    });

    it('gets all barter items', done => {
        let barterItem = getFakeBarterItem();
        currentBarterItems.push(barterItem);
        barterItems.add(barterItem).then(() => {
            return barterItems.all();
        }).should.eventually.have.length.above(1).and.include(barterItem).notify(done);
    });

    it('adds an item, removes the item', done => {
        let barterItem = getFakeBarterItem();
        currentBarterItems.push(barterItem);
        barterItems.add(barterItem).then(() => {
            return barterItems.remove(barterItem.barterItemId);
        }).then(() => {
            return barterItems.all();
        }).should.eventually.have.length.above(1).and.not.include(barterItem).notify(done);
    });

    afterEach(done => {

        // TODO: batch and call .close after all complete
        currentBarterItems.forEach((item) =>
            barterItems.remove(item.barterItemId)
        );

        require('../../../../models/db/dbProvider.js').close();
        done();
    });
});

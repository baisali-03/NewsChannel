import Realm from 'realm';

const HeadlineSchema = {
  name: 'Headline',
  properties: {
    id: 'string',
    title: 'string',
  },
  primaryKey: 'id',
};

const realm = new Realm({
  schema: [HeadlineSchema],
  schemaVersion: 3,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 3) {
      const oldObjects = oldRealm.objects('Headline');
      const newObjects = newRealm.objects('Headline');
      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].id = oldObjects[i].id;
        newObjects[i].title = oldObjects[i].title;
      }
    }
  },
});

export default realm;

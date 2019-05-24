module.exports = function deleteablePlugin(schema, {
  index = { deleted: 1 },
} = {}) {
  schema.add({
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  });
  if (index) schema.index(index);

  /**
   *
   */
  schema.method('softDelete', function softDelete() {
    this.deleted = true;
    return this.save();
  });

  /**
   *
   */
  schema.method('undelete', function undelete() {
    this.deleted = false;
    return this.save();
  });

  /**
   *
   */
  schema.static('findByIdActive', function findByIdActive(id, fields) {
    return this.findOne({ _id: id || null, deleted: false }, fields);
  });

  /**
   *
   */
  schema.static('findActive', function findActive(criteria, fields) {
    return this.find({ ...criteria, deleted: false }, fields);
  });

  /**
   *
   */
  schema.static('countActive', function countActive(criteria) {
    return this.count({ ...criteria, deleted: false });
  });

  /**
   *
   */
  schema.static('findOneActive', function findOneActive(criteria, fields) {
    return this.findOne({ ...criteria, deleted: false }, fields);
  });

  /**
   *
   */
  schema.static('strictFindByIdActive', async function strictFindByIdActive(id, fields) {
    const doc = await this.findByIdActive(id, fields);
    if (!doc) throw new Error(`No ${this.modelName} found for ID '${id}'`);
    return doc;
  });

  /**
   *
   */
  schema.static('strictFindOneActive', async function strictFindOneActive(criteria, fields) {
    const doc = await this.findOneActive(criteria, fields);
    if (!doc) throw new Error(`No ${this.modelName} found for criteria '${JSON.stringify(criteria)}'`);
    return doc;
  });
};

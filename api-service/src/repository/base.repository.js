class BaseRepository {
    model
    
    findById = async (id) => model.findById(id);
    insert = async (record) => model.insert(record);
    all= async () => model.all();
    delete= async (id) => model.destroy(id);
    update= async(record, id) => model.update(record, id);
    fillables = () => model.fillables
}

module.exports = BaseRepository
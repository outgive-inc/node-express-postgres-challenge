class BaseController {
    
    repo
    status
    message

    index = async (req, res) => {
        let data = await this.repo.model.all()
        this.message = `${this.repo.model.table} found successfully!`
        this.status = 200

        if(data.length == 0){
            this.message = `${this.repo.model.table} not found!`
            this.status = 404
        }

        res.status(this.status).json(this.apiResponse(this.message, data))
    }
    
    create = async (req, res) => {
        res.status(this.status).json("create")
    }
    
    store = async (req, res) => {
        let data = await this.repo.model.insert(req.body)
        this.message = `${this.repo.model.table} saved successfully!`
        this.status = 200
        res.status(this.status).json(this.apiResponse(this.message, data))
    }
    
    show = async (req, res) => {
        let data = await this.repo.model.findById(req.params.id)

        this.message = `${this.repo.model.table} found successfully!`
        this.status = 200

        if(!data){
            message = `${this.repo.model.table} not found!`
            this.status = 404
        }
        
        res.status(this.status).json(this.apiResponse(this.message, data))
    }
    
    update = async (req, res) => {
        let data = await this.repo.model.update(req.body, req.params.id)

        this.message = `${this.repo.model.table} updated successfully!`
        this.status = 200

        if(!data){
            this.message = `${this.repo.model.table} not found!`
            this.status = 404
        }
        
        res.status(this.status).json(this.apiResponse(this.message, data))
    }
    
    destroy = async (req, res) => {
    
        let isDeleted = await this.repo.model.destroy(req.params.id)
        
        this.message = `${this.repo.model.table} deleted successfully!`
        this.status = 200

        if(!isDeleted){
            this.message = `${this.repo.model.table} not found!`
            this.status = 404
        }
    
        res.status(this.status).json(this.apiResponse(this.message))
    }

    apiResponse = (message = "", data = {}) => {
        return {
            message: message,
            data: data
        }
    }
    
}



module.exports = BaseController
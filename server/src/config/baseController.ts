import { CreateOptions, ModelCtor, UpdateOptions } from "sequelize"; 

 

export class BaseController<T = any> {
    
    async getAll(model : ModelCtor<any>){
        return model.findAll();
    }

    async get(model : ModelCtor<any> , id : string){
        return model.findByPk(id);
    }
    
    async post(model : ModelCtor<any> , data : any , options?:CreateOptions<any>){
        return model.create(data , options);
    }

    async update(model : ModelCtor<any> ,id : string,  data : any , options?: UpdateOptions){
        return model.update(data , { where :{ id : id }});
    }
}





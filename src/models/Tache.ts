import mongoose, {Document, Schema} from 'mongoose';
export interface ITache{
    title:string,
    description:string,
    etat:boolean,
    user:string
}
export interface ITacheModel extends ITache , Document{

}
const TacheSchema:Schema= new Schema(
    {
        title:{type:String, required:true},
        description:{type:String, required:true},
        etat:{type:Boolean, default:false},
        user:{type:Schema.Types.ObjectId, required:true,ref:"users"}
    },
    {
        timestamps:true
    }
);
export default mongoose.model<ITacheModel>('taches',TacheSchema);
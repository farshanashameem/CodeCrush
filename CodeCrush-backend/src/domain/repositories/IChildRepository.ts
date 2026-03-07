import { Child } from "../entities/Child";

export interface IChildRepository {

    createChild( child: Child) : Promise<Child>;

    getChildById( parentId:string, childId: string ) : Promise<Child | null>;

    getChildrenByParentId ( parentId: string ) : Promise< Child[]>;

    updateChild( parentId:string, childId: string, data:Partial<Child>) : Promise<Child | null >;

    toggleDeleteChild ( parentId:string, childId: string ) : Promise<Child | null >;

    toggleBlockChild( parentId:string, childId: string ) : Promise<Child | null >;
}
import { Child } from "../entities/Child";

export interface IChildRepository {

    createChild( child: Child) : Promise<Child>;

    getChildById( childId: string ) : Promise<Child | null>;

    getChildrenByParentId ( parentId: string ) : Promise< Child[]>;

    updateChild( childId: string, data:Partial<Child>) : Promise<Child | null >;

    deleteChild ( childId: string ) : Promise<void>;

    blockChild( childId: string ) : Promise<void>;
}
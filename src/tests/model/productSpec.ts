import {ProductModel, Product} from '../../store_models/product';

let testProduct: Product = {
    productName: "tea",
    productPrice: 10,
    productCategory: "drinks"
   };

   const productModel = new ProductModel();


describe('Test product model', () => {    
    it('test create product => id should be returned', async () => {
        testProduct = await productModel.create(testProduct);
        expect(testProduct.id).toBeGreaterThanOrEqual(1);
    });

    it('test index products => be sure testProduct founded in the list', async () => {
        const plist: Product[] = await productModel.index();
        expect(plist.length).toBeGreaterThanOrEqual(1);
        // we use let because value will be changed every loop
        let newProd: Product ;
        let founded = false;
        for(let i = 0;  i < plist.length; i++){
             newProd = plist[i];
             if(newProd.id == testProduct.id){
                founded = true;
                break;
             }
        }
        expect(founded).toBeTrue;      
    });
    
    it('test show product => should match test product values', async () => {
        const item =await productModel.show(testProduct.id as number);
        expect(item.productName).toEqual(testProduct.productName);
        expect(item.productPrice).toEqual(testProduct.productPrice);
        expect(item.productCategory).toEqual(testProduct.productCategory);        
    });

   
    it('test list product by category => list should contain testProduct', async () => {
        const plist: Product[] = await productModel.byCategory(testProduct.productCategory);
        expect(plist.length).toBeGreaterThanOrEqual(1);
        // we use let because value will be changed every loop
        let item: Product ;
        let founded = false;
        for(let i = 0;  i < plist.length; i++){
             item = plist[i];
             if(item.id == testProduct.id){
                founded = true;
                break;
             }
        }
        expect(founded).toBeTrue;
    });
});

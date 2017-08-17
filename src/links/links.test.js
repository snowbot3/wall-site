import WallLinks from './links'
import { expect } from 'chai'

describe('WallLinks',()=>{
	before(()=>{
		// need mocking...
	});
	it('find all empty',async ()=>{
		const db = new WallDb();
		expect(await db.find()).deep.equal([]);
	});
	it('insert simple',async ()=>{
		const db = new WallDb()
		expect(await db.insert({a:1,b:2}))
			.keys(['_id','a','b','createdAt','updatedAt'])
			.include({a:1,b:2})
	});
	it('find simple',async ()=>{
		const db = new WallDb()
		await db.insert({a:1,b:2})
		const docs = await db.find()
		expect(docs).lengthOf(1)
		expect(docs[0]).keys(['_id','a','b','createdAt','updatedAt'])
			.include({a:1,b:2})
	});
});
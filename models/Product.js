import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		id: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		quantity: { type: Array, required: true },
		price: { type: Array, required: true },
		stock: { type: Array, required: true },
		brand: { type: Array, required: true, default: 'Omid Health Style' },
		image: { type: Array, required: false },
		description: { type: String, required: true, default: 'Description' },
		isAvailable: { type: Boolean, required: true, default: true },
		isDiscount: { type: Boolean, required: true, default: false },
		discount: { type: Number, required: false, default: 0 },
		isFeatured: { type: Boolean, required: true, default: false },
	},
	{
		timestamps: true,
	}
);

const Product =
	mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;

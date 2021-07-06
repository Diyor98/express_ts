import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
	email: string;
	name: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    const user = this as UserDocument;

    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    return next();
})

// User for logging in
userSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	const user = this as UserDocument;

	return bcrypt.compare(candidatePassword, user.password).catch(e => false);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
import bcrypt from "bcrypt";

export async function bcryptConverter(password){
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
}
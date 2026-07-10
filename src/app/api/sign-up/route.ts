import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const { username, firstName, lastName, email, password, phoneNumber } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: 'Username is already taken',
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      return Response.json(
        {
          success: false,
          message: 'User already exists with this email',
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      isVerified: true, 
    });

    await newUser.save();

    return Response.json(
      {
        success: true,
        message: 'User registered successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}

import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { username, firstName, lastName, email, password, phoneNumber } = body;

    // Validate required fields
    if (!username || !firstName || !lastName || !email || !password) {
      return Response.json(
        {
          success: false,
          message: 'All required fields must be provided',
        },
        { status: 400 }
      );
    }

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
      phoneNumber: phoneNumber || '',
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      {
        success: false,
        message: `Error registering user: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

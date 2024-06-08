<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TblUsers;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function signUp(Request $request)
    {
        // Validate the request
        $this->validate($request, [
            'firstname' => 'required',
            'lastname' => 'required',
            'emailid' => 'required|email',
            'userId' => 'required|numeric',
            'phone' => 'required|numeric',
            'password' => 'required',
            'confirmPassword' => 'required|same:password',
            'userType' => 'required',
        ]);

        // Check if email or ID already exists
        $emailExists = TblUsers::where('Email', $request->emailid)->count();
        $idExists = TblUsers::where('ID', $request->userId)->count();

        if ($emailExists > 0 || $idExists > 0) {
            return response()->json(['status' => 0, 'message' => 'Email or ID already exists']);
        }

        // Generate verification code
        $code = rand(999999, 111111);
        $status = "notverified";

        // Create user record
        $user = TblUsers::create([
            'FirstName' => $request->firstname,
            'LastName' => $request->lastname,
            'Email' => $request->emailid,
            'ID' => $request->userId,
            'ContactNumber' => $request->phone,
            'Password' => $request->password,
            'UserType' => $request->userType,
            'code' => $code,
            'status' => $status,
        ]);

        if ($user) {
            // Send verification email
            $subject = "Email Verification Code";
            $message = "Your verification code is $code";
            $sender = "From: nxb4401@utacloud3.reclaimhosting.com";

            if (mail($request->emailid, $subject, $message, $sender)) {
                return response()->json(['status' => 1, 'message' => 'Record created successfully']);
            } else {
                return response()->json(['status' => 0, 'message' => 'Failed to send verification code by email']);
            }
        } else {
            return response()->json(['status' => 0, 'message' => 'Failed to insert data into the database']);
        }
    }
    
}

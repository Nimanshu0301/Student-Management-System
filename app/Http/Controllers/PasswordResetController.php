<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PasswordResetController extends Controller
{
    public function resetPassword(Request $request)
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

            $email = $request->input('email');

            // Proceed with the password change based on email
            $password = $request->input('password');
            $cpassword = $request->input('cpassword');

            if ($password !== $cpassword) {
                $response = [
                    'status' => 0,
                    'message' => 'Confirm password not matched!',
                ];
            } else {
                $code = 0;
                DB::table('tblusers')
                    ->where('email', $email)
                    ->update(['code' => $code, 'password' => $password]);

                $info = "Your password has been changed. Now you can login with your new password.";
                $response = [
                    'status' => 1,
                    'message' => 'Password changed successfully',
                ];
            }

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}

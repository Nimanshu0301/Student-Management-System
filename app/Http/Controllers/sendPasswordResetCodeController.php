<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class sendPasswordResetCodeController extends Controller
{
    public function sendPasswordResetCode(Request $request)
    {
        try {
            header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

            $server = 'localhost:3306';
            $dbname = 'nxb4401_studentmsd';
            $user = 'nxb4401_root';
            $pass = 'NXB@2023666';

            $conn = new \PDO('mysql:host=' . $server . ';dbname=' . $dbname, $user, $pass);
            $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

            if ($request->isMethod('post')) {
                $userData = json_decode($request->getContent());
                $email = $userData->email;

                $user = DB::table('tblusers')->where('Email', $email)->first();

                if ($user) {
                    $code = rand(999999, 111111);

                    DB::table('tblusers')->where('ID', $user->ID)->update(['code' => $code]);

                    $subject = "Password Reset Code";
                    $message = "Your password reset code is $code";

                    try {
                        Mail::raw($message, function ($message) use ($email, $subject) {
                            $message->to($email)->subject($subject);
                        });

                        $info = "We've sent a password reset OTP to your email - $email";
                        session(['info' => $info, 'email' => $email]);
                        $response = ['status' => 1, 'message' => 'Email sent successfully'];
                    } catch (\Exception $e) {
                        $errors['otp-error'] = "Failed while sending code: " . $e->getMessage();
                        $response = ['status' => 0, 'message' => 'Failed to send the password reset email'];
                    }

                    return response()->json($response);
                } else {
                    $errors['email'] = "This email address does not exist!";
                }
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'message' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}

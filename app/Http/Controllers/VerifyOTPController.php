<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VerifyOTPController extends Controller
{
    public function verifyOTP(Request $request)
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
                if ($request->has('check')) {
                    session_start();
                    $_SESSION['info'] = '';
                    $otpCode = $request->input('otp');

                    $checkCodeQuery = "SELECT * FROM tblusers WHERE code = :otpCode";
                    $stmt = $conn->prepare($checkCodeQuery);
                    $stmt->bindParam(':otpCode', $otpCode);
                    $stmt->execute();

                    if ($stmt->rowCount() > 0) {
                        $fetchData = $stmt->fetch(\PDO::FETCH_ASSOC);
                        $fetchCode = $fetchData['code'];
                        $code = 0;

                        $updateOtpQuery = "UPDATE tblusers SET code = :code WHERE code = :fetchCode";
                        $stmt = $conn->prepare($updateOtpQuery);
                        $stmt->bindParam(':code', $code);
                        $stmt->bindParam(':fetchCode', $fetchCode);
                        $stmt->execute();

                        if ($stmt->rowCount() > 0) {
                            $response = ['status' => 1, 'message' => 'OTP verification successful'];
                        } else {
                            $response = ['status' => 0, 'message' => 'Failed to update OTP'];
                        }
                    } else {
                        $response = ['status' => 0, 'message' => 'Incorrect OTP'];
                    }

                    return response()->json($response);
                }
            } else {
                return response()->json(['status' => 0, 'message' => 'Invalid request'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'message' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}

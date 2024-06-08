<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OtpVerificationController extends Controller
{
    public function verifyOtp(Request $request)
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

            if ($request->isMethod('post') && $request->has('check')) {
                $otpCode = $request->input('otp');
                session_start();
                $_SESSION['info'] = '';

                $checkCodeSql = "SELECT * FROM tblusers WHERE code = :otpCode";
                $stmt = $conn->prepare($checkCodeSql);
                $stmt->bindParam(':otpCode', $otpCode);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    $fetchData = $stmt->fetch(\PDO::FETCH_ASSOC);
                    $fetchCode = $fetchData['code'];
                    $code = 0;
                    $status = 'verified';

                    $updateOtpSql = "UPDATE tblusers SET code = :code, status = :status WHERE code = :fetchCode";
                    $stmt = $conn->prepare($updateOtpSql);
                    $stmt->bindParam(':code', $code);
                    $stmt->bindParam(':status', $status);
                    $stmt->bindParam(':fetchCode', $fetchCode);
                    $stmt->execute();

                    if ($stmt->rowCount() > 0) {
                        return response()->json(['status' => 1, 'message' => 'OTP verification successful']);
                    } else {
                        return response()->json(['status' => 0, 'message' => 'Failed to update OTP'], 500);
                    }
                } else {
                    return response()->json(['status' => 0, 'message' => 'Incorrect OTP']);
                }
            } else {
                return response()->json(['status' => 0, 'message' => 'Invalid request']);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}

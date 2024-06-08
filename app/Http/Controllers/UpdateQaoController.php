<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UpdateQaoController extends Controller
{
    public function updateQAOResult(Request $request)
    {
        try {
            // Your database credentials
            $server = 'localhost:3306';
            $dbname = 'nxb4401_studentmsd';
            $user = 'nxb4401_root';
            $pass = 'NXB@2023666';

            $conn = new \PDO('mysql:host=' . $server . ';dbname=' . $dbname, $user, $pass);
            $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

            if ($request->isMethod('post')) {
                $data = $request->json()->all();

                $userID = $data['UserID'];
                $courseID = $data['CourseID'];
                $qaOResult = $data['QAOResult'];

                $sql = "UPDATE tblmarks SET QAOResult = :QAOResult WHERE StudentID = :StudentID AND CourseID = :CourseID";

                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':StudentID', $userID);
                $stmt->bindParam(':CourseID', $courseID);
                $stmt->bindParam(':QAOResult', $qaOResult);

                $stmt->execute();

                return response()->json(['message' => 'QAOResult updated successfully']);
            } else {
                return response()->json(['error' => 'Invalid request method.'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}

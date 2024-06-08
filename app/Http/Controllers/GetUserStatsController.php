<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetUserStatsController extends Controller
{
    public function getUserStats(Request $request)
    {
        try {
            // Your database credentials
            $server = 'localhost:3306';
            $dbname = 'nxb4401_studentmsd';
            $user = 'nxb4401_root';
            $pass = 'NXB@2023666';

            $conn = new \PDO('mysql:host=' . $server . ';dbname=' . $dbname, $user, $pass);
            $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

            if ($request->isMethod('get')) {
                // Count occurrences of UserType
                $sql = "SELECT UserType, COUNT(*) AS Count FROM tblusers GROUP BY UserType";
                $userCounts = DB::select($sql);

                // Count occurrences of CourseID in tblmarks
                $sql2 = "SELECT tblclass.CourseID, COUNT(tblmarks.CourseID) AS MarksCount
                         FROM tblclass
                         LEFT JOIN tblmarks ON tblclass.CourseID = tblmarks.CourseID
                         GROUP BY tblclass.CourseID";
                $resultsCounts = DB::select($sql2);

                $response = [
                    'UserTypeCounts' => $userCounts,
                    'PassedCounts' => $resultsCounts
                ];

                return response()->json($response);
            } else {
                return response()->json(['error' => 'Invalid request method.'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    public function getStatistics(Request $request)
    {
        try {
            $data = [];

            // Total count of ID in tblclass
            $classCount = DB::table('tblclass')->count();
            $data['TotalClassCount'] = $classCount;

            // Total count of UserType = Instructor from tblusers
            $instructorCount = DB::table('tblusers')->where('UserType', 'Instructor')->count();
            $data['TotalInstructorCount'] = $instructorCount;

            // Total count of UserType = Student from tblusers
            $studentCount = DB::table('tblusers')->where('UserType', 'Student')->count();
            $data['TotalStudentCount'] = $studentCount;

            // Total count of "Pass" in InstructorResult column from tblmarks
            $passedCount = DB::table('tblmarks')->where('InstructorResult', 'Pass')->count();
            $data['TotalPassedCount'] = $passedCount;

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}

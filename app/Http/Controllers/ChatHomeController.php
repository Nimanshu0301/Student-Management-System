<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatHomeController extends Controller
{
    public function getUsers(Request $request)
    {
        try {
            if ($request->has('ID')) {
                $ID = $request->input('ID');

                $result = DB::table('tblusers')->where('ID', '!=', $ID)->get();

                if (!$result->isEmpty()) {
                    return response()->json(['status' => 'success', 'data' => $result], 200);
                } else {
                    return response()->json(['status' => 'failed', 'data' => 'No records found.'], 404);
                }
            } else {
                return response()->json(['status' => 'failed', 'data' => 'Missing ID parameter.'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}

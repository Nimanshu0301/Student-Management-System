<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

            $to_id = $request->input('to_id');
            $message = $request->input('message');
            $from_id = $request->input('from_id');
            $datetime = $request->input('datetime');

            $data = array();
            $data1 = array();

            if (!$message && !$datetime) {
                $result1 = DB::table('chat_list as cl')
                    ->select('cl.to_id', 'cl.message', 'cl.from_id', 'cl.datetime', 'u.FirstName')
                    ->join('tblusers as u', 'u.ID', '=', 'cl.from_id')
                    ->where(function ($query) use ($to_id, $from_id) {
                        $query->where('cl.to_id', $to_id)
                            ->where('cl.from_id', $from_id);
                    })
                    ->orWhere(function ($query) use ($to_id, $from_id) {
                        $query->where('cl.to_id', $from_id)
                            ->where('cl.from_id', $to_id);
                    })
                    ->orderBy('cl.datetime', 'DESC')
                    ->limit(10)
                    ->get();

                if ($result1->isNotEmpty()) {
                    $res = array("status" => "success", "data" => $result1);
                } else {
                    $res = array("status" => "failed", "data" => 'No records found.');
                }
            } else {
                $insertData = [
                    'to_id' => $to_id,
                    'message' => $message,
                    'from_id' => $from_id,
                    'datetime' => $datetime
                ];

                DB::table('chat_list')->insert($insertData);

                $result1 = DB::table('chat_list as cl')
                    ->select('cl.to_id', 'cl.message', 'cl.from_id', 'cl.datetime', 'u.FirstName')
                    ->join('tblusers as u', 'u.ID', '=', 'cl.from_id')
                    ->where(function ($query) use ($to_id, $from_id) {
                        $query->where('cl.to_id', $to_id)
                            ->where('cl.from_id', $from_id);
                    })
                    ->orWhere(function ($query) use ($to_id, $from_id) {
                        $query->where('cl.to_id', $from_id)
                            ->where('cl.from_id', $to_id);
                    })
                    ->orderBy('cl.datetime', 'DESC')
                    ->limit(10)
                    ->get();

                if ($result1->isNotEmpty()) {
                    $res = array("status" => "success", "data" => $result1);
                } else {
                    $res = array("failed" => true, "data" => 'No records found.');
                }
            }

            $res = json_encode($res);
            return $res;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatList extends Model
{
    protected $table = 'chat_list';
    protected $primaryKey = 'id';
    protected $fillable = ['to_id', 'message', 'from_id', 'datetime'];
}

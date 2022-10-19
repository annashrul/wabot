<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class receive_message extends Model
{
    use HasFactory;
    protected $table = 'receive_message_table';
    public $timestamps = false;
}

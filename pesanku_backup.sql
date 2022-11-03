PGDMP     .    -            
    z            pesanku_backup    11.15    14.2 �    :           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ;           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            <           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            =           1262    18548    pesanku_backup    DATABASE     r   CREATE DATABASE pesanku_backup WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE pesanku_backup;
                postgres    false            �            1259    18549 	   api_table    TABLE     �  CREATE TABLE public.api_table (
    id bigint NOT NULL,
    url character varying(191) NOT NULL,
    method character varying(191) NOT NULL,
    id_user bigint NOT NULL,
    id_device bigint NOT NULL,
    var0 character varying(191),
    var1 character varying(191),
    var2 character varying(191),
    var3 character varying(191),
    var4 character varying(191),
    var5 character varying(191),
    var6 character varying(191),
    var7 character varying(191),
    var8 character varying(191),
    var9 character varying(191),
    param0 character varying(191),
    param1 character varying(191),
    param2 character varying(191),
    param3 character varying(191),
    param4 character varying(191),
    param5 character varying(191)
);
    DROP TABLE public.api_table;
       public            postgres    false            �            1259    18555    api_table_id_seq    SEQUENCE     y   CREATE SEQUENCE public.api_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.api_table_id_seq;
       public          postgres    false    196            >           0    0    api_table_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.api_table_id_seq OWNED BY public.api_table.id;
          public          postgres    false    197            �            1259    18557    category_table    TABLE     �   CREATE TABLE public.category_table (
    id bigint NOT NULL,
    category_name character varying(191) NOT NULL,
    id_user bigint NOT NULL,
    jumlah_member bigint
);
 "   DROP TABLE public.category_table;
       public            postgres    false            �            1259    18560    category_table_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.category_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.category_table_id_seq;
       public          postgres    false    198            ?           0    0    category_table_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.category_table_id_seq OWNED BY public.category_table.id;
          public          postgres    false    199            �            1259    18562    categorycontact_table    TABLE     �   CREATE TABLE public.categorycontact_table (
    id bigint NOT NULL,
    id_contact bigint NOT NULL,
    id_category bigint NOT NULL
);
 )   DROP TABLE public.categorycontact_table;
       public            postgres    false            �            1259    18565    categorycontact_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categorycontact_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.categorycontact_table_id_seq;
       public          postgres    false    200            @           0    0    categorycontact_table_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.categorycontact_table_id_seq OWNED BY public.categorycontact_table.id;
          public          postgres    false    201            �            1259    18567    contactWA_table    TABLE     �  CREATE TABLE public."contactWA_table" (
    id bigint NOT NULL,
    id_device bigint NOT NULL,
    jid character varying(191) NOT NULL,
    name character varying(191) NOT NULL,
    notify_name character varying(191),
    short_name character varying(191),
    profile_url character varying(191),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 %   DROP TABLE public."contactWA_table";
       public            postgres    false            �            1259    18573    contactWA_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public."contactWA_table_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."contactWA_table_id_seq";
       public          postgres    false    202            A           0    0    contactWA_table_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."contactWA_table_id_seq" OWNED BY public."contactWA_table".id;
          public          postgres    false    203            �            1259    18575    contact_table    TABLE     �   CREATE TABLE public.contact_table (
    id bigint NOT NULL,
    id_user bigint NOT NULL,
    contact_number character varying(191) NOT NULL,
    contact_name character varying(191) NOT NULL
);
 !   DROP TABLE public.contact_table;
       public            postgres    false            �            1259    18578    contact_table_id_seq    SEQUENCE     }   CREATE SEQUENCE public.contact_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.contact_table_id_seq;
       public          postgres    false    204            B           0    0    contact_table_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.contact_table_id_seq OWNED BY public.contact_table.id;
          public          postgres    false    205            �            1259    18580    conversation_table    TABLE       CREATE TABLE public.conversation_table (
    id bigint NOT NULL,
    id_device bigint NOT NULL,
    id_path bigint NOT NULL,
    sender_jid character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 &   DROP TABLE public.conversation_table;
       public            postgres    false            �            1259    18583    conversation_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.conversation_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.conversation_table_id_seq;
       public          postgres    false    206            C           0    0    conversation_table_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.conversation_table_id_seq OWNED BY public.conversation_table.id;
          public          postgres    false    207            �            1259    18585    device_table    TABLE     ;  CREATE TABLE public.device_table (
    id bigint NOT NULL,
    phone_number character varying(191) NOT NULL,
    uid character varying(191),
    name character varying(191),
    status character varying(191),
    id_callback bigint NOT NULL,
    id_user bigint NOT NULL,
    type character varying(191) NOT NULL
);
     DROP TABLE public.device_table;
       public            postgres    false            �            1259    18591    device_table_id_seq    SEQUENCE     |   CREATE SEQUENCE public.device_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.device_table_id_seq;
       public          postgres    false    208            D           0    0    device_table_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.device_table_id_seq OWNED BY public.device_table.id;
          public          postgres    false    209            �            1259    18593    eform_answer_table    TABLE     �   CREATE TABLE public.eform_answer_table (
    id bigint NOT NULL,
    phone_number character varying(191) NOT NULL,
    id_question bigint NOT NULL,
    answer character varying(191) NOT NULL
);
 &   DROP TABLE public.eform_answer_table;
       public            postgres    false            �            1259    18596    eform_answer_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.eform_answer_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.eform_answer_table_id_seq;
       public          postgres    false    210            E           0    0    eform_answer_table_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.eform_answer_table_id_seq OWNED BY public.eform_answer_table.id;
          public          postgres    false    211            �            1259    18598    eform_question_table    TABLE     �   CREATE TABLE public.eform_question_table (
    id bigint NOT NULL,
    id_eform bigint NOT NULL,
    question character varying(191) NOT NULL,
    question_number bigint NOT NULL
);
 (   DROP TABLE public.eform_question_table;
       public            postgres    false            �            1259    18601    eform_question_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.eform_question_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.eform_question_table_id_seq;
       public          postgres    false    212            F           0    0    eform_question_table_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.eform_question_table_id_seq OWNED BY public.eform_question_table.id;
          public          postgres    false    213            �            1259    18603    eform_table    TABLE     �   CREATE TABLE public.eform_table (
    id bigint NOT NULL,
    id_user bigint NOT NULL,
    id_device bigint,
    eform_name character varying(191) NOT NULL
);
    DROP TABLE public.eform_table;
       public            postgres    false            �            1259    18606    eform_table_id_seq    SEQUENCE     {   CREATE SEQUENCE public.eform_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.eform_table_id_seq;
       public          postgres    false    214            G           0    0    eform_table_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.eform_table_id_seq OWNED BY public.eform_table.id;
          public          postgres    false    215            �            1259    18608    failed_jobs    TABLE     &  CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(191) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.failed_jobs;
       public            postgres    false            �            1259    18615    failed_jobs_id_seq    SEQUENCE     {   CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.failed_jobs_id_seq;
       public          postgres    false    216            H           0    0    failed_jobs_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;
          public          postgres    false    217            �            1259    18617    groupBroadcastWA_table    TABLE     X  CREATE TABLE public."groupBroadcastWA_table" (
    id bigint NOT NULL,
    id_device bigint NOT NULL,
    jid character varying(191) NOT NULL,
    name character varying(191),
    unread character varying(191),
    last_message_time character varying(191),
    is_muted character varying(191),
    last_message_id character varying(191),
    is_marked_spam character varying(191),
    user_id character varying(191),
    is_group boolean,
    is_broadcast boolean,
    deleted_at character varying(191),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 ,   DROP TABLE public."groupBroadcastWA_table";
       public            postgres    false            �            1259    18623    groupBroadcastWA_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public."groupBroadcastWA_table_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."groupBroadcastWA_table_id_seq";
       public          postgres    false    218            I           0    0    groupBroadcastWA_table_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public."groupBroadcastWA_table_id_seq" OWNED BY public."groupBroadcastWA_table".id;
          public          postgres    false    219            �            1259    18625    media_table    TABLE     �   CREATE TABLE public.media_table (
    id bigint NOT NULL,
    path_file character varying(191),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    file_name character varying(191) NOT NULL
);
    DROP TABLE public.media_table;
       public            postgres    false            �            1259    18628    media_table_id_seq    SEQUENCE     {   CREATE SEQUENCE public.media_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.media_table_id_seq;
       public          postgres    false    220            J           0    0    media_table_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.media_table_id_seq OWNED BY public.media_table.id;
          public          postgres    false    221            �            1259    18630    message_table    TABLE     s  CREATE TABLE public.message_table (
    id bigint NOT NULL,
    id_device bigint NOT NULL,
    message character varying(16384) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    recipient bigint,
    "time" character varying(191),
    id_media bigint,
    "varStorage" boolean,
    type character varying(191)
);
 !   DROP TABLE public.message_table;
       public            postgres    false            �            1259    18636    message_table_id_seq    SEQUENCE     }   CREATE SEQUENCE public.message_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.message_table_id_seq;
       public          postgres    false    222            K           0    0    message_table_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.message_table_id_seq OWNED BY public.message_table.id;
          public          postgres    false    223            �            1259    18638 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(191) NOT NULL,
    batch integer NOT NULL
);
    DROP TABLE public.migrations;
       public            postgres    false            �            1259    18641    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          postgres    false    224            L           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    225            �            1259    18643 
   node_table    TABLE     �   CREATE TABLE public.node_table (
    id bigint NOT NULL,
    response character varying(16384) NOT NULL,
    title character varying(191)
);
    DROP TABLE public.node_table;
       public            postgres    false            �            1259    18649    node_table_id_seq    SEQUENCE     z   CREATE SEQUENCE public.node_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.node_table_id_seq;
       public          postgres    false    226            M           0    0    node_table_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.node_table_id_seq OWNED BY public.node_table.id;
          public          postgres    false    227            �            1259    18651    package_table    TABLE        CREATE TABLE public.package_table (
    id bigint NOT NULL,
    id_user bigint NOT NULL,
    package_sent bigint NOT NULL,
    package_receive bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 !   DROP TABLE public.package_table;
       public            postgres    false            �            1259    18654    package_table_id_seq    SEQUENCE     }   CREATE SEQUENCE public.package_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.package_table_id_seq;
       public          postgres    false    228            N           0    0    package_table_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.package_table_id_seq OWNED BY public.package_table.id;
          public          postgres    false    229            �            1259    18656    password_resets    TABLE     �   CREATE TABLE public.password_resets (
    email character varying(191) NOT NULL,
    token character varying(191) NOT NULL,
    created_at timestamp(0) without time zone
);
 #   DROP TABLE public.password_resets;
       public            postgres    false            �            1259    18659 
   path_table    TABLE       CREATE TABLE public.path_table (
    id bigint NOT NULL,
    id_rule bigint,
    "id_currentNode" bigint NOT NULL,
    "id_nextNode" bigint NOT NULL,
    type character varying(191) NOT NULL,
    key character varying(10),
    title character varying(255)
);
    DROP TABLE public.path_table;
       public            postgres    false            �            1259    18662    path_table_id_seq    SEQUENCE     z   CREATE SEQUENCE public.path_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.path_table_id_seq;
       public          postgres    false    231            O           0    0    path_table_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.path_table_id_seq OWNED BY public.path_table.id;
          public          postgres    false    232            �            1259    18673    receive_message_table    TABLE     �   CREATE TABLE public.receive_message_table (
    id bigint NOT NULL,
    message character varying(191) NOT NULL,
    sender_jid character varying(191) NOT NULL,
    id_device bigint NOT NULL
);
 )   DROP TABLE public.receive_message_table;
       public            postgres    false            �            1259    18676    receive_message_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.receive_message_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.receive_message_table_id_seq;
       public          postgres    false    233            P           0    0    receive_message_table_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.receive_message_table_id_seq OWNED BY public.receive_message_table.id;
          public          postgres    false    234            �            1259    18678    recipient_table    TABLE     �   CREATE TABLE public.recipient_table (
    id bigint NOT NULL,
    id_message bigint NOT NULL,
    name character varying(191),
    type character varying(191),
    phone character varying(191)
);
 #   DROP TABLE public.recipient_table;
       public            postgres    false            �            1259    18684 
   rule_table    TABLE     �   CREATE TABLE public.rule_table (
    id bigint NOT NULL,
    rule_name character varying(191) NOT NULL,
    target character varying(191) NOT NULL,
    id_device bigint NOT NULL
);
    DROP TABLE public.rule_table;
       public            postgres    false            �            1259    18687    rule_table_id_seq    SEQUENCE     z   CREATE SEQUENCE public.rule_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.rule_table_id_seq;
       public          postgres    false    236            Q           0    0    rule_table_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.rule_table_id_seq OWNED BY public.rule_table.id;
          public          postgres    false    237            �            1259    18689    schedule_message_table    TABLE     �  CREATE TABLE public.schedule_message_table (
    id bigint NOT NULL,
    id_device bigint NOT NULL,
    id_message bigint NOT NULL,
    send_time timestamp(0) without time zone NOT NULL,
    limit_time timestamp(0) without time zone,
    recurrent character varying(191) NOT NULL,
    specific_date character varying(191),
    sent_count bigint,
    max_count bigint,
    status character varying(191) NOT NULL
);
 *   DROP TABLE public.schedule_message_table;
       public            postgres    false            �            1259    18695    schedule_message_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schedule_message_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.schedule_message_table_id_seq;
       public          postgres    false    238            R           0    0    schedule_message_table_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.schedule_message_table_id_seq OWNED BY public.schedule_message_table.id;
          public          postgres    false    239            �            1259    18697    send_message_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.send_message_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.send_message_table_id_seq;
       public          postgres    false    235            S           0    0    send_message_table_id_seq    SEQUENCE OWNED BY     T   ALTER SEQUENCE public.send_message_table_id_seq OWNED BY public.recipient_table.id;
          public          postgres    false    240            �            1259    18699    users    TABLE     �  CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    email character varying(191) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(191) NOT NULL,
    package_sent bigint,
    package_receive bigint,
    kuota_sent bigint DEFAULT '100'::bigint NOT NULL,
    kuota_receive bigint DEFAULT '100'::bigint NOT NULL,
    sent character varying(191) DEFAULT '0'::character varying NOT NULL,
    receive character varying(191) DEFAULT '0'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    token character varying(191)
);
    DROP TABLE public.users;
       public            postgres    false            �            1259    18709    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    241            T           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    242            �            1259    18711    vaksin_table    TABLE     2  CREATE TABLE public.vaksin_table (
    id integer NOT NULL,
    coy_cd character varying(20),
    div_cd character varying(20),
    nip_no character varying(20),
    pat_name character varying(200),
    empl_sts character varying(20),
    empl_cat character varying(30),
    empl_loc character varying(50),
    vacc_dose character varying(50),
    vacc1_cd character varying(50),
    vacc1_dt character varying(50),
    vacc2_cd character varying(50),
    vacc2_dt character varying(50),
    vacc3_cd character varying(50),
    vacc3_dt character varying(50)
);
     DROP TABLE public.vaksin_table;
       public            postgres    false            �            1259    18717    vaksin_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vaksin_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.vaksin_table_id_seq;
       public          postgres    false    243            U           0    0    vaksin_table_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.vaksin_table_id_seq OWNED BY public.vaksin_table.id;
          public          postgres    false    244            �            1259    18719    varstorage_table    TABLE     B  CREATE TABLE public.varstorage_table (
    id bigint NOT NULL,
    id_message bigint,
    var0 character varying(191),
    var1 character varying(191),
    var2 character varying(191),
    var3 character varying(191),
    var4 character varying(191),
    var5 character varying(191),
    var6 character varying(191),
    var7 character varying(191),
    var8 character varying(191),
    var9 character varying(191),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    name character varying(191),
    phone character varying(20)
);
 $   DROP TABLE public.varstorage_table;
       public            postgres    false            �            1259    18725    varstorage_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.varstorage_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.varstorage_table_id_seq;
       public          postgres    false    245            V           0    0    varstorage_table_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.varstorage_table_id_seq OWNED BY public.varstorage_table.id;
          public          postgres    false    246                       2604    18727    api_table id    DEFAULT     l   ALTER TABLE ONLY public.api_table ALTER COLUMN id SET DEFAULT nextval('public.api_table_id_seq'::regclass);
 ;   ALTER TABLE public.api_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    197    196                       2604    18728    category_table id    DEFAULT     v   ALTER TABLE ONLY public.category_table ALTER COLUMN id SET DEFAULT nextval('public.category_table_id_seq'::regclass);
 @   ALTER TABLE public.category_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    199    198                       2604    18729    categorycontact_table id    DEFAULT     �   ALTER TABLE ONLY public.categorycontact_table ALTER COLUMN id SET DEFAULT nextval('public.categorycontact_table_id_seq'::regclass);
 G   ALTER TABLE public.categorycontact_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200                        2604    18730    contactWA_table id    DEFAULT     |   ALTER TABLE ONLY public."contactWA_table" ALTER COLUMN id SET DEFAULT nextval('public."contactWA_table_id_seq"'::regclass);
 C   ALTER TABLE public."contactWA_table" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202            !           2604    18731    contact_table id    DEFAULT     t   ALTER TABLE ONLY public.contact_table ALTER COLUMN id SET DEFAULT nextval('public.contact_table_id_seq'::regclass);
 ?   ALTER TABLE public.contact_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204            "           2604    18732    conversation_table id    DEFAULT     ~   ALTER TABLE ONLY public.conversation_table ALTER COLUMN id SET DEFAULT nextval('public.conversation_table_id_seq'::regclass);
 D   ALTER TABLE public.conversation_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206            #           2604    18733    device_table id    DEFAULT     r   ALTER TABLE ONLY public.device_table ALTER COLUMN id SET DEFAULT nextval('public.device_table_id_seq'::regclass);
 >   ALTER TABLE public.device_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208            $           2604    18734    eform_answer_table id    DEFAULT     ~   ALTER TABLE ONLY public.eform_answer_table ALTER COLUMN id SET DEFAULT nextval('public.eform_answer_table_id_seq'::regclass);
 D   ALTER TABLE public.eform_answer_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210            %           2604    18735    eform_question_table id    DEFAULT     �   ALTER TABLE ONLY public.eform_question_table ALTER COLUMN id SET DEFAULT nextval('public.eform_question_table_id_seq'::regclass);
 F   ALTER TABLE public.eform_question_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212            &           2604    18736    eform_table id    DEFAULT     p   ALTER TABLE ONLY public.eform_table ALTER COLUMN id SET DEFAULT nextval('public.eform_table_id_seq'::regclass);
 =   ALTER TABLE public.eform_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            (           2604    18737    failed_jobs id    DEFAULT     p   ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);
 =   ALTER TABLE public.failed_jobs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            )           2604    18738    groupBroadcastWA_table id    DEFAULT     �   ALTER TABLE ONLY public."groupBroadcastWA_table" ALTER COLUMN id SET DEFAULT nextval('public."groupBroadcastWA_table_id_seq"'::regclass);
 J   ALTER TABLE public."groupBroadcastWA_table" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218            *           2604    18739    media_table id    DEFAULT     p   ALTER TABLE ONLY public.media_table ALTER COLUMN id SET DEFAULT nextval('public.media_table_id_seq'::regclass);
 =   ALTER TABLE public.media_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220            +           2604    18740    message_table id    DEFAULT     t   ALTER TABLE ONLY public.message_table ALTER COLUMN id SET DEFAULT nextval('public.message_table_id_seq'::regclass);
 ?   ALTER TABLE public.message_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222            ,           2604    18741    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224            -           2604    18742    node_table id    DEFAULT     n   ALTER TABLE ONLY public.node_table ALTER COLUMN id SET DEFAULT nextval('public.node_table_id_seq'::regclass);
 <   ALTER TABLE public.node_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226            .           2604    18743    package_table id    DEFAULT     t   ALTER TABLE ONLY public.package_table ALTER COLUMN id SET DEFAULT nextval('public.package_table_id_seq'::regclass);
 ?   ALTER TABLE public.package_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228            /           2604    18744    path_table id    DEFAULT     n   ALTER TABLE ONLY public.path_table ALTER COLUMN id SET DEFAULT nextval('public.path_table_id_seq'::regclass);
 <   ALTER TABLE public.path_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            0           2604    18745    receive_message_table id    DEFAULT     �   ALTER TABLE ONLY public.receive_message_table ALTER COLUMN id SET DEFAULT nextval('public.receive_message_table_id_seq'::regclass);
 G   ALTER TABLE public.receive_message_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233            1           2604    18746    recipient_table id    DEFAULT     {   ALTER TABLE ONLY public.recipient_table ALTER COLUMN id SET DEFAULT nextval('public.send_message_table_id_seq'::regclass);
 A   ALTER TABLE public.recipient_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    235            2           2604    18747    rule_table id    DEFAULT     n   ALTER TABLE ONLY public.rule_table ALTER COLUMN id SET DEFAULT nextval('public.rule_table_id_seq'::regclass);
 <   ALTER TABLE public.rule_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    236            3           2604    18748    schedule_message_table id    DEFAULT     �   ALTER TABLE ONLY public.schedule_message_table ALTER COLUMN id SET DEFAULT nextval('public.schedule_message_table_id_seq'::regclass);
 H   ALTER TABLE public.schedule_message_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    238            8           2604    18749    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    241            9           2604    18750    vaksin_table id    DEFAULT     r   ALTER TABLE ONLY public.vaksin_table ALTER COLUMN id SET DEFAULT nextval('public.vaksin_table_id_seq'::regclass);
 >   ALTER TABLE public.vaksin_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243            :           2604    18751    varstorage_table id    DEFAULT     z   ALTER TABLE ONLY public.varstorage_table ALTER COLUMN id SET DEFAULT nextval('public.varstorage_table_id_seq'::regclass);
 B   ALTER TABLE public.varstorage_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    246    245                      0    18549 	   api_table 
   TABLE DATA           �   COPY public.api_table (id, url, method, id_user, id_device, var0, var1, var2, var3, var4, var5, var6, var7, var8, var9, param0, param1, param2, param3, param4, param5) FROM stdin;
    public          postgres    false    196   �                0    18557    category_table 
   TABLE DATA           S   COPY public.category_table (id, category_name, id_user, jumlah_member) FROM stdin;
    public          postgres    false    198   �      	          0    18562    categorycontact_table 
   TABLE DATA           L   COPY public.categorycontact_table (id, id_contact, id_category) FROM stdin;
    public          postgres    false    200   >                0    18567    contactWA_table 
   TABLE DATA           �   COPY public."contactWA_table" (id, id_device, jid, name, notify_name, short_name, profile_url, created_at, updated_at) FROM stdin;
    public          postgres    false    202   |                0    18575    contact_table 
   TABLE DATA           R   COPY public.contact_table (id, id_user, contact_number, contact_name) FROM stdin;
    public          postgres    false    204   �                0    18580    conversation_table 
   TABLE DATA           h   COPY public.conversation_table (id, id_device, id_path, sender_jid, created_at, updated_at) FROM stdin;
    public          postgres    false    206   !                0    18585    device_table 
   TABLE DATA           g   COPY public.device_table (id, phone_number, uid, name, status, id_callback, id_user, type) FROM stdin;
    public          postgres    false    208   �                0    18593    eform_answer_table 
   TABLE DATA           S   COPY public.eform_answer_table (id, phone_number, id_question, answer) FROM stdin;
    public          postgres    false    210   �                0    18598    eform_question_table 
   TABLE DATA           W   COPY public.eform_question_table (id, id_eform, question, question_number) FROM stdin;
    public          postgres    false    212   �                0    18603    eform_table 
   TABLE DATA           I   COPY public.eform_table (id, id_user, id_device, eform_name) FROM stdin;
    public          postgres    false    214   +                0    18608    failed_jobs 
   TABLE DATA           a   COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
    public          postgres    false    216   t                0    18617    groupBroadcastWA_table 
   TABLE DATA           �   COPY public."groupBroadcastWA_table" (id, id_device, jid, name, unread, last_message_time, is_muted, last_message_id, is_marked_spam, user_id, is_group, is_broadcast, deleted_at, created_at, updated_at) FROM stdin;
    public          postgres    false    218   �                0    18625    media_table 
   TABLE DATA           W   COPY public.media_table (id, path_file, created_at, updated_at, file_name) FROM stdin;
    public          postgres    false    220   �                0    18630    message_table 
   TABLE DATA           �   COPY public.message_table (id, id_device, message, created_at, updated_at, recipient, "time", id_media, "varStorage", type) FROM stdin;
    public          postgres    false    222   L      !          0    18638 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public          postgres    false    224    �      #          0    18643 
   node_table 
   TABLE DATA           9   COPY public.node_table (id, response, title) FROM stdin;
    public          postgres    false    226   ��      %          0    18651    package_table 
   TABLE DATA           k   COPY public.package_table (id, id_user, package_sent, package_receive, created_at, updated_at) FROM stdin;
    public          postgres    false    228   �      '          0    18656    password_resets 
   TABLE DATA           C   COPY public.password_resets (email, token, created_at) FROM stdin;
    public          postgres    false    230   *�      (          0    18659 
   path_table 
   TABLE DATA           d   COPY public.path_table (id, id_rule, "id_currentNode", "id_nextNode", type, key, title) FROM stdin;
    public          postgres    false    231   G�      *          0    18673    receive_message_table 
   TABLE DATA           S   COPY public.receive_message_table (id, message, sender_jid, id_device) FROM stdin;
    public          postgres    false    233   ��      ,          0    18678    recipient_table 
   TABLE DATA           L   COPY public.recipient_table (id, id_message, name, type, phone) FROM stdin;
    public          postgres    false    235   ��      -          0    18684 
   rule_table 
   TABLE DATA           F   COPY public.rule_table (id, rule_name, target, id_device) FROM stdin;
    public          postgres    false    236   i�      /          0    18689    schedule_message_table 
   TABLE DATA           �   COPY public.schedule_message_table (id, id_device, id_message, send_time, limit_time, recurrent, specific_date, sent_count, max_count, status) FROM stdin;
    public          postgres    false    238   ��      2          0    18699    users 
   TABLE DATA           �   COPY public.users (id, name, email, email_verified_at, password, package_sent, package_receive, kuota_sent, kuota_receive, sent, receive, created_at, updated_at, token) FROM stdin;
    public          postgres    false    241   ��      4          0    18711    vaksin_table 
   TABLE DATA           �   COPY public.vaksin_table (id, coy_cd, div_cd, nip_no, pat_name, empl_sts, empl_cat, empl_loc, vacc_dose, vacc1_cd, vacc1_dt, vacc2_cd, vacc2_dt, vacc3_cd, vacc3_dt) FROM stdin;
    public          postgres    false    243   ��      6          0    18719    varstorage_table 
   TABLE DATA           �   COPY public.varstorage_table (id, id_message, var0, var1, var2, var3, var4, var5, var6, var7, var8, var9, created_at, updated_at, name, phone) FROM stdin;
    public          postgres    false    245   ��      W           0    0    api_table_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.api_table_id_seq', 5, true);
          public          postgres    false    197            X           0    0    category_table_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.category_table_id_seq', 5, true);
          public          postgres    false    199            Y           0    0    categorycontact_table_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.categorycontact_table_id_seq', 7, true);
          public          postgres    false    201            Z           0    0    contactWA_table_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."contactWA_table_id_seq"', 1645, true);
          public          postgres    false    203            [           0    0    contact_table_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.contact_table_id_seq', 8, true);
          public          postgres    false    205            \           0    0    conversation_table_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.conversation_table_id_seq', 372, true);
          public          postgres    false    207            ]           0    0    device_table_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.device_table_id_seq', 12, true);
          public          postgres    false    209            ^           0    0    eform_answer_table_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.eform_answer_table_id_seq', 1, false);
          public          postgres    false    211            _           0    0    eform_question_table_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.eform_question_table_id_seq', 3, true);
          public          postgres    false    213            `           0    0    eform_table_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.eform_table_id_seq', 4, true);
          public          postgres    false    215            a           0    0    failed_jobs_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);
          public          postgres    false    217            b           0    0    groupBroadcastWA_table_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."groupBroadcastWA_table_id_seq"', 1, false);
          public          postgres    false    219            c           0    0    media_table_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.media_table_id_seq', 5, true);
          public          postgres    false    221            d           0    0    message_table_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.message_table_id_seq', 2563, true);
          public          postgres    false    223            e           0    0    migrations_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.migrations_id_seq', 39, true);
          public          postgres    false    225            f           0    0    node_table_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.node_table_id_seq', 153, true);
          public          postgres    false    227            g           0    0    package_table_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.package_table_id_seq', 1, false);
          public          postgres    false    229            h           0    0    path_table_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.path_table_id_seq', 257, true);
          public          postgres    false    232            i           0    0    receive_message_table_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.receive_message_table_id_seq', 2670, true);
          public          postgres    false    234            j           0    0    rule_table_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.rule_table_id_seq', 4, true);
          public          postgres    false    237            k           0    0    schedule_message_table_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.schedule_message_table_id_seq', 1, false);
          public          postgres    false    239            l           0    0    send_message_table_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.send_message_table_id_seq', 10, true);
          public          postgres    false    240            m           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 17, true);
          public          postgres    false    242            n           0    0    vaksin_table_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.vaksin_table_id_seq', 17925, true);
          public          postgres    false    244            o           0    0    varstorage_table_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.varstorage_table_id_seq', 4, true);
          public          postgres    false    246            <           2606    18761    api_table api_table_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.api_table
    ADD CONSTRAINT api_table_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.api_table DROP CONSTRAINT api_table_pkey;
       public            postgres    false    196            >           2606    18763 "   category_table category_table_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.category_table
    ADD CONSTRAINT category_table_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.category_table DROP CONSTRAINT category_table_pkey;
       public            postgres    false    198            @           2606    18765 0   categorycontact_table categorycontact_table_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.categorycontact_table
    ADD CONSTRAINT categorycontact_table_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.categorycontact_table DROP CONSTRAINT categorycontact_table_pkey;
       public            postgres    false    200            B           2606    18767 $   contactWA_table contactWA_table_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."contactWA_table"
    ADD CONSTRAINT "contactWA_table_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."contactWA_table" DROP CONSTRAINT "contactWA_table_pkey";
       public            postgres    false    202            D           2606    18769     contact_table contact_table_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.contact_table
    ADD CONSTRAINT contact_table_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.contact_table DROP CONSTRAINT contact_table_pkey;
       public            postgres    false    204            F           2606    18771 *   conversation_table conversation_table_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.conversation_table
    ADD CONSTRAINT conversation_table_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.conversation_table DROP CONSTRAINT conversation_table_pkey;
       public            postgres    false    206            H           2606    18773    device_table device_table_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.device_table
    ADD CONSTRAINT device_table_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.device_table DROP CONSTRAINT device_table_pkey;
       public            postgres    false    208            J           2606    18775 *   eform_answer_table eform_answer_table_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.eform_answer_table
    ADD CONSTRAINT eform_answer_table_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.eform_answer_table DROP CONSTRAINT eform_answer_table_pkey;
       public            postgres    false    210            L           2606    18777 .   eform_question_table eform_question_table_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.eform_question_table
    ADD CONSTRAINT eform_question_table_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.eform_question_table DROP CONSTRAINT eform_question_table_pkey;
       public            postgres    false    212            N           2606    18779    eform_table eform_table_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.eform_table
    ADD CONSTRAINT eform_table_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.eform_table DROP CONSTRAINT eform_table_pkey;
       public            postgres    false    214            P           2606    18781    failed_jobs failed_jobs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_pkey;
       public            postgres    false    216            R           2606    18783 #   failed_jobs failed_jobs_uuid_unique 
   CONSTRAINT     ^   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);
 M   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_uuid_unique;
       public            postgres    false    216            T           2606    18785 2   groupBroadcastWA_table groupBroadcastWA_table_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."groupBroadcastWA_table"
    ADD CONSTRAINT "groupBroadcastWA_table_pkey" PRIMARY KEY (id);
 `   ALTER TABLE ONLY public."groupBroadcastWA_table" DROP CONSTRAINT "groupBroadcastWA_table_pkey";
       public            postgres    false    218            V           2606    18787    media_table media_table_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.media_table
    ADD CONSTRAINT media_table_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.media_table DROP CONSTRAINT media_table_pkey;
       public            postgres    false    220            X           2606    18789     message_table message_table_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.message_table
    ADD CONSTRAINT message_table_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.message_table DROP CONSTRAINT message_table_pkey;
       public            postgres    false    222            Z           2606    18791    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public            postgres    false    224            \           2606    18793    node_table node_table_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.node_table
    ADD CONSTRAINT node_table_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.node_table DROP CONSTRAINT node_table_pkey;
       public            postgres    false    226            ^           2606    18795     package_table package_table_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.package_table
    ADD CONSTRAINT package_table_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.package_table DROP CONSTRAINT package_table_pkey;
       public            postgres    false    228            a           2606    18799    path_table path_table_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.path_table
    ADD CONSTRAINT path_table_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.path_table DROP CONSTRAINT path_table_pkey;
       public            postgres    false    231            c           2606    18801 0   receive_message_table receive_message_table_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.receive_message_table
    ADD CONSTRAINT receive_message_table_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.receive_message_table DROP CONSTRAINT receive_message_table_pkey;
       public            postgres    false    233            g           2606    18803    rule_table rule_table_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.rule_table
    ADD CONSTRAINT rule_table_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.rule_table DROP CONSTRAINT rule_table_pkey;
       public            postgres    false    236            i           2606    18805 2   schedule_message_table schedule_message_table_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.schedule_message_table
    ADD CONSTRAINT schedule_message_table_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.schedule_message_table DROP CONSTRAINT schedule_message_table_pkey;
       public            postgres    false    238            e           2606    18807 '   recipient_table send_message_table_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.recipient_table
    ADD CONSTRAINT send_message_table_pkey PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.recipient_table DROP CONSTRAINT send_message_table_pkey;
       public            postgres    false    235            k           2606    18809    users users_email_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_unique;
       public            postgres    false    241            m           2606    18811    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    241            o           2606    18813    vaksin_table vaksin_table_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.vaksin_table
    ADD CONSTRAINT vaksin_table_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.vaksin_table DROP CONSTRAINT vaksin_table_pkey;
       public            postgres    false    243            q           2606    18815 &   varstorage_table varstorage_table_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.varstorage_table
    ADD CONSTRAINT varstorage_table_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.varstorage_table DROP CONSTRAINT varstorage_table_pkey;
       public            postgres    false    245            _           1259    18817    password_resets_email_index    INDEX     X   CREATE INDEX password_resets_email_index ON public.password_resets USING btree (email);
 /   DROP INDEX public.password_resets_email_index;
       public            postgres    false    230            r           2606    18818 %   api_table api_table_id_device_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.api_table
    ADD CONSTRAINT api_table_id_device_foreign FOREIGN KEY (id_device) REFERENCES public.device_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.api_table DROP CONSTRAINT api_table_id_device_foreign;
       public          postgres    false    2888    208    196            s           2606    18823 #   api_table api_table_id_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.api_table
    ADD CONSTRAINT api_table_id_user_foreign FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.api_table DROP CONSTRAINT api_table_id_user_foreign;
       public          postgres    false    196    2925    241            t           2606    18828 -   category_table category_table_id_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.category_table
    ADD CONSTRAINT category_table_id_user_foreign FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.category_table DROP CONSTRAINT category_table_id_user_foreign;
       public          postgres    false    2925    241    198            u           2606    18833 ?   categorycontact_table categorycontact_table_id_category_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.categorycontact_table
    ADD CONSTRAINT categorycontact_table_id_category_foreign FOREIGN KEY (id_category) REFERENCES public.category_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 i   ALTER TABLE ONLY public.categorycontact_table DROP CONSTRAINT categorycontact_table_id_category_foreign;
       public          postgres    false    2878    198    200            v           2606    18838 >   categorycontact_table categorycontact_table_id_contact_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.categorycontact_table
    ADD CONSTRAINT categorycontact_table_id_contact_foreign FOREIGN KEY (id_contact) REFERENCES public.contact_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 h   ALTER TABLE ONLY public.categorycontact_table DROP CONSTRAINT categorycontact_table_id_contact_foreign;
       public          postgres    false    200    204    2884            x           2606    18843 +   contact_table contact_table_id_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.contact_table
    ADD CONSTRAINT contact_table_id_user_foreign FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.contact_table DROP CONSTRAINT contact_table_id_user_foreign;
       public          postgres    false    241    2925    204            w           2606    18848 1   contactWA_table contactwa_table_id_device_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."contactWA_table"
    ADD CONSTRAINT contactwa_table_id_device_foreign FOREIGN KEY (id_device) REFERENCES public.device_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public."contactWA_table" DROP CONSTRAINT contactwa_table_id_device_foreign;
       public          postgres    false    202    2888    208            y           2606    18853 7   conversation_table conversation_table_id_device_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversation_table
    ADD CONSTRAINT conversation_table_id_device_foreign FOREIGN KEY (id_device) REFERENCES public.device_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.conversation_table DROP CONSTRAINT conversation_table_id_device_foreign;
       public          postgres    false    2888    208    206            z           2606    18858 )   device_table device_table_id_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.device_table
    ADD CONSTRAINT device_table_id_user_foreign FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.device_table DROP CONSTRAINT device_table_id_user_foreign;
       public          postgres    false    2925    208    241            {           2606    18863 9   eform_answer_table eform_answer_table_id_question_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.eform_answer_table
    ADD CONSTRAINT eform_answer_table_id_question_foreign FOREIGN KEY (id_question) REFERENCES public.eform_question_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.eform_answer_table DROP CONSTRAINT eform_answer_table_id_question_foreign;
       public          postgres    false    210    2892    212            |           2606    18868 :   eform_question_table eform_question_table_id_eform_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.eform_question_table
    ADD CONSTRAINT eform_question_table_id_eform_foreign FOREIGN KEY (id_eform) REFERENCES public.eform_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.eform_question_table DROP CONSTRAINT eform_question_table_id_eform_foreign;
       public          postgres    false    212    214    2894            }           2606    18873 )   eform_table eform_table_id_device_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.eform_table
    ADD CONSTRAINT eform_table_id_device_foreign FOREIGN KEY (id_device) REFERENCES public.device_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.eform_table DROP CONSTRAINT eform_table_id_device_foreign;
       public          postgres    false    214    2888    208            ~           2606    18878 '   eform_table eform_table_id_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.eform_table
    ADD CONSTRAINT eform_table_id_user_foreign FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.eform_table DROP CONSTRAINT eform_table_id_user_foreign;
       public          postgres    false    214    241    2925                       2606    18883 ?   groupBroadcastWA_table groupbroadcastwa_table_id_device_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."groupBroadcastWA_table"
    ADD CONSTRAINT groupbroadcastwa_table_id_device_foreign FOREIGN KEY (id_device) REFERENCES public.device_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 k   ALTER TABLE ONLY public."groupBroadcastWA_table" DROP CONSTRAINT groupbroadcastwa_table_id_device_foreign;
       public          postgres    false    208    218    2888            �           2606    18888 -   message_table message_table_id_device_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.message_table
    ADD CONSTRAINT message_table_id_device_foreign FOREIGN KEY (id_device) REFERENCES public.device_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.message_table DROP CONSTRAINT message_table_id_device_foreign;
       public          postgres    false    2888    208    222            �           2606    18893 ,   message_table message_table_id_media_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.message_table
    ADD CONSTRAINT message_table_id_media_foreign FOREIGN KEY (id_media) REFERENCES public.media_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.message_table DROP CONSTRAINT message_table_id_media_foreign;
       public          postgres    false    222    220    2902            �           2606    18898 +   package_table package_table_id_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.package_table
    ADD CONSTRAINT package_table_id_user_foreign FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.package_table DROP CONSTRAINT package_table_id_user_foreign;
       public          postgres    false    2925    228    241            �           2606    18903 ,   path_table path_table_id_currentnode_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.path_table
    ADD CONSTRAINT path_table_id_currentnode_foreign FOREIGN KEY ("id_currentNode") REFERENCES public.node_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.path_table DROP CONSTRAINT path_table_id_currentnode_foreign;
       public          postgres    false    2908    231    226            �           2606    18908 )   path_table path_table_id_nextnode_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.path_table
    ADD CONSTRAINT path_table_id_nextnode_foreign FOREIGN KEY ("id_nextNode") REFERENCES public.node_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.path_table DROP CONSTRAINT path_table_id_nextnode_foreign;
       public          postgres    false    231    226    2908            �           2606    18913 %   path_table path_table_id_rule_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.path_table
    ADD CONSTRAINT path_table_id_rule_foreign FOREIGN KEY (id_rule) REFERENCES public.rule_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.path_table DROP CONSTRAINT path_table_id_rule_foreign;
       public          postgres    false    2919    231    236            �           2606    18918 =   receive_message_table receive_message_table_id_device_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.receive_message_table
    ADD CONSTRAINT receive_message_table_id_device_foreign FOREIGN KEY (id_device) REFERENCES public.device_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 g   ALTER TABLE ONLY public.receive_message_table DROP CONSTRAINT receive_message_table_id_device_foreign;
       public          postgres    false    2888    233    208            �           2606    18923 '   rule_table rule_table_id_device_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.rule_table
    ADD CONSTRAINT rule_table_id_device_foreign FOREIGN KEY (id_device) REFERENCES public.device_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.rule_table DROP CONSTRAINT rule_table_id_device_foreign;
       public          postgres    false    236    208    2888            �           2606    18928 ?   schedule_message_table schedule_message_table_id_device_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule_message_table
    ADD CONSTRAINT schedule_message_table_id_device_foreign FOREIGN KEY (id_device) REFERENCES public.device_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 i   ALTER TABLE ONLY public.schedule_message_table DROP CONSTRAINT schedule_message_table_id_device_foreign;
       public          postgres    false    238    208    2888            �           2606    18933 @   schedule_message_table schedule_message_table_id_message_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule_message_table
    ADD CONSTRAINT schedule_message_table_id_message_foreign FOREIGN KEY (id_message) REFERENCES public.message_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 j   ALTER TABLE ONLY public.schedule_message_table DROP CONSTRAINT schedule_message_table_id_message_foreign;
       public          postgres    false    238    222    2904            �           2606    18938 5   recipient_table send_message_table_id_message_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipient_table
    ADD CONSTRAINT send_message_table_id_message_foreign FOREIGN KEY (id_message) REFERENCES public.message_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.recipient_table DROP CONSTRAINT send_message_table_id_message_foreign;
       public          postgres    false    235    2904    222            �           2606    18943 4   varstorage_table varstorage_table_id_message_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.varstorage_table
    ADD CONSTRAINT varstorage_table_id_message_foreign FOREIGN KEY (id_message) REFERENCES public.message_table(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.varstorage_table DROP CONSTRAINT varstorage_table_id_message_foreign;
       public          postgres    false    245    222    2904               F   x�3��())(���O��O�I�K�����44�4�,I-.��É��sQ�Hc�iB}#M�od� ��p9         U   x�3�JM�,�L�+Q��,.Q0V��/S0202R0��25�44�4�2"�����2C+�2�Aʌ�L�)3�2�*����� �2�      	   .   x��I 0��,�J���q4~�pLN�
�PR��ޛ�4��I���            x������ � �         x   x�u˱�P��}��ܶ�� �.M4a���N,g8_~���ظ�¢p{E|�����1\���g�r]B�w!�m�]��OV���0y<uo�L�
k3dd����[�hq7F0+         z   x�}α�0Dњ�"88%��,��0�,nT|��d�**�P��l
A��#��5�%�� ������4��1��,mecv3,�o�̱o[\�n��H�S+���u$֭��Wk緵�B�8�           x�m��R�0����)x'raaюgjٹ�Rl��,��Ǫ0ݜ���?
HbB(�QD_���Rk8ڛ�X�kk? n��l�.{]&�i0}S����v���!G,�e���7r�]��S?:�}q��g���ņ109�Y}4����S���6s��%�'�i��7+��Ft��$$�J%����Z%*�DmlɹZ$	v�$7����cal�����2����Q��N.��Q�'��������+�g B.�����^w}c�EN�\���y��9��            x������ � �         5   x�3�4��K�M�4�21�s��R�3�K��39�����!!>��\1z\\\ 1�         9   x�3�44�4��K�MTHM�/��2�1�1����
N��)�%�
��a�.\1z\\\ ���            x������ � �            x������ � �         �   x���M
�@F���@��t�R�@U�޿�tB �Gx���m_>S}�91#&)iDU$)Ӽ{9�B�����rKcV�$�T�~����C�<���x�6�jc�
���]�b�T`�.�'T抉����$��	�a�G _r���            x��ݎ�H�.x=�D.f!5R)�F08�RuU���%u���*d42+����^���8��Opa��������ʦ�R�L���}f�Fs��_��V���_����.��B�D��(o�u�{��?y_mD��ګ���\���w߽���{W�Vxߕ몔M.���y?Tå��m/��h��V�^Y�����E�����R܋����w��-�F��zKQ�]v]Wp㛪�;��W��Wς�u���˺k�Fx\toD��V�bӡ4��;�������\V���������L��o�eW���k�˱�_�ɲ���������[)�vs��6�mo���]�?�３u�������V�F�ȫ	�0|�ϟ���YgQb�]�i����X-S�%͢�Uf�%f�L���Ϣ�*3Ԓ�Z�UK�Ze�Zf��)�fad�j��Z�Uq�Zf�%e�L����%3Բ`�L��$���>�eJ�DYL����z	X/�ea��z	Y/S�%���π	6����O���*3��S���&V����O��$Ȓ�*3��I�2ς�Uf�g���<	s��z���tz	2|�o��z����zYXe�^B��O��0��,J�2�������{��m�}U�U)�r����._�P<}��i�{��q'��w+ߋBxõ/<5>��Z�-���p~� ��~���؋�r��S���]�ukQ�j,�-��DO��w'�M^zhtk�
�t]�W�k�[�"����y�\ʢەq].�s�Mqą�Y8���*#���1����jݭڼ*�����;l�Ko7J�l�ڃ�ۍ������j(�n<����.����V�n_�Vz��wy)�M���� ���������]մ����W9`z�n�u�8Է�M�y ��V�l�;��W���5o<�R������ v��M��w��jy#���V���]\�+��F�ڮƯ�_^\x�
��]�>��g��&ޓ?~����Q����B�}�һ���mYݗ�Ӧ��9<�����=���nufU�m]C�`�<	�Zy���-=x)�����ˮ��;�۝̴ͥw��5���'�ɳ��x�]��Y�t:�ε����-4C��P��%^����^����ݡ�}~��u_5M�,$)��C��������A{_a�Wr�6h�}���4�����V�PPBQU��綵(�B��e��Ņ蠓�j����`T��jsq��/��H�*����
0|��&aT�8̠�j�����_���k�GyX�#߫��n�
�%�S-��Sc��=�t��e�3	��o�d3�5XB/�{��R����1�MK�s{�F�]A榨����F9_�(�K�3=Ī��F�K����#.P�p�B��7r��c�� +��/����k�io��@�����	�@_�o�1�����rZ��G��@*`�G���������4(���`����/�`��ue��ڴ��,n��8���\�N��ڷ�ʞN��jFQ ��W�S`_�®���Dq��m��Rt��o�|�Ԩ��ME�����QZK��>�tϖ�ma�Vh��Vp֚?#�kc�D�i�]�8��r���cG�m?hk�9�;�|��b6��e�Q긧8̣�зW��\ՠ�^�����b�)�*�v���c������4\��[!���p��C^7@=p�h;7t�� ���4�Jy��?D�><�)����"� kmJ�_�����oE��`A���S��$.r�9�Q\�e����X�vEU�?�k�L�����Vп5Ė�=��K�?=�����=���{QQֈ�g���g�.�Q�5~zD�
�&ov���SC��1��v��>�A�����R�Om��P]H�A?���aR�Z{3��^B�z��z�	x�,���-u%�y��T)9�	[���!���1���]Als	�R���K���D�
�V!z~St�w�`�s��
�<��%�[�G�)�{�a��r�-6g@���}��㤍E�SP��V�@�����)g�*0P�>�=R���R��������&e��S��V��i ^����s|
�U�
o�D��_���2�zՃ�n��{Oq�<C)��PS�q�o�<~����T�r��2��x	�	m[0�>C���nz��F��UQݢ�쵥��Jݣ7��-`�Л�N��o�\7��+�^Cl *C�3q���`�JD�
>���3�� �oՇ�y���C���h��y	��4 ����YԱT#�}S�E��{0����s����}��J3Ky��(F}s�^����T�Vi(CS�b�� C�S)I�[�����u�����wG2��z\�ot<������Rǀ���HT��������q,ޯmNq�8:jG&�C�'5s�T�L�ȑ�e���j�R)l�k�V�{�'"0�{�B#��)o�1�|3X0�]��ϟ�H~7
�!�A݊A�Yq
��C�7
�/�s��o�"�~@�Z�l_��_��Zy4�`1�z�������u��ه���8�[I���r<29�ֿ7:�Yb�N���s��S?o�LA� ���8s4��V^�9�-���1lZ�P	fU������+��M��?�� �u���r���a�6�������7�o!z����5�,ײ�GS|�Z��U 8~������}=�P�.�G�}{���ǁ㠞�����;� '���c��W�U:&�*NT��]�M�.��LW����.���Y{A����˹�LTb�ۼ�x������ӊ:���;L/�f:/׀'��k�%D�`����y�4�S�x퐛R�����R�t]���Z*-9�ŌD���yo[�B�{���0G���\�����J���^B<�:%:_W��Q3�����_C�9�ѝ2�*��,j�����D���z�=�b~]Щ\�3|��8�θ�n�x�u|j�o��V`��$|���G��{��<�T�m�鄡"��������&����!��V�	0��8~^au��z�����-U#:������b���3�osq�SW
ɷ]k^����!p[��	�UA>JFYx"�w����[��T}��.����;Y69���� ���V`U���/]?�ٳ+��F_�?,]>�bP
f�a"��=���#�]�n�@dv
��BL��\��!XǱ��㻇 �+�oBUf^23ߩ�s����z���H!;���N�vc Fb1b�|7��I�X���Uf�%a#�F�7b��+ڑ�$׼Mm�fV���9O�x
�0��<�^���ML�0��L�p��DzYx�<�,\Xe�n>G�U~�Q�@��B����WPNj�fg+)F2S/�w�N/�,��df��zq˻r���F�Lq��V�	0�U��G��۪J�#:ԋ���h��/�>�]�^��ʗ��~�i�}�=��^ᗃ�U��W�U�~�-����iE���rD��xd���楖�<\�-���%��I�2?[�?��|��#bG����g��*3�yͯ*U	����+��ٸ��p>	�+o�T��"�>���i���vrzlRi����˂('�5�Jf ,�<������O���vkD�W�uy������û獺�3�D�ٲ���Z��jב�� �f&�l1	�c�&}qȖ�-��e�-���Ŝdb���N�cˤ>�`0�%g��d&���;y�e>�<*��N.��4Ě�U�d�^����������5�� KG�Yz�䞞��F�:4��ۖe��\�aR�-�L[�c+�?uW��V2�o8���r�`�������U�e�~���kO�Poe�!!������5N�ǀ$gm��[��G���%0
I`�6��ۚla������]��G�l�+�+��(�t���b��`�p���y6���Z���[S2��\|3�Ջ,V/�V��"l�ܬ^BoJf�_�3�\ 6�2�U2`s��i���w{!e�7w ]�7�    .^���F8X�14N�M��6�`з�/��[s;���X�j����W��Ѹfn�k��<�77�Y�OO,��ڼ�@�6�Y����}��&����[}����Z��*�����ز�rL�f��~b��X0I+�g������ѣ���e�0���;�מ�
�Re}��>��˞:C��﷕?�k8��^�+�{Ý`�L���]����R��R*:��U&5}��%Gjy�1s�_�Mߗn� L$�Q2`���8�Î,����>��]���+ %����X5�墯R��Y�d�`���ƨ�p�h�`����0Rc)���
:�u�o�����Q_2��iqC���3��.�[�u@F�������:�xn����oo�Cw�J����˜�޲_�h�a���[e&�x[`�#�fV�	0~C>�gY�K���~C��w!��l?�� X��g)�����,��2�
�Ɓ��F��B�����k0�E���#�	0^�2e�ύ���2S/n�Sx�I�`�ql0��H͊�Af��k��0b�g~��i�Z�s������#��#��ӫ�s�����07����`�ok��Qg��E�2���d��uF�r�s��N��es�lѩ��\f�S�0G�Ϣd&�8u� sXhq�!u����2tIF)�s���W���@|��*3�~����6E"Х�)�FNl�HZR��,ܲF���w4b�9��2sy-������gt&�K��	"���gt8,�ذ�����s�	0^!9%�Q����n4�^���F�2S/�?�Z/�Uf��KN�ӎi�����T/��e�^�ʆK��2Yd~l���1|�Q�:�dH,��r�X��G�����!)��ٚ�*.c>�v.#��tS���h
���QF�8N�wra���seS˅ZQ�VA�v&���x��XFõ!L}�cn�*#s�Ջ��#lf�9:��8��sCXHf3K�@�6F��"��[8'6anK�VAo��sA��X!y��q��憰�uGA��d��!,	�2�0N�3�\��E[�� l���2��T�mk� �T3SˍZ1	@S��A����eZdQb�Ÿeh��~0d��%��2sCNC�u��A�%�{z-#�5�SZ� �ӂjQ�[���W�O⠆��SٴU�W��� l�=�=���B�2�S	W�L��0�o#����3y�h\͌N�� ���N�hf�Tˈb0v�&�ɭF)���zwͭ�b��w0Ǯ�=˱sHɼ�z_U��^�������={����>�����
����4�i6mn.�da�NvR�6��j��Y���������^�h���7dO���N>�S��3��ɋV����[q����O�� #z��U9���~��To^�x�����@�4�|�=���!�;��.�4=��r.3�lM����sr�eD1n�j|���?	�ȌE擠P�[�����}:��2����YԐ��2��j5v��(��Df���ZF�w�(]ehn4���u㤎2�(&�*�+��.ԏ��AZF�>��[�$�����s����F-R��e&�b��N�Us��AF�K���.�7ϕ:�����U��Ye��\��r���L,�1��M�U�t';-#��4S߅��,0�� �q-ų�H��d��bj�Q+$�J�� ��N�Ui�3��;��b�Q�f��p��Н$�U��t��@L-7j��\ZF�GfL�Uie�uAJ�i*���S� �AF���u�b���4��6L7*�j��V�p���0��Q����ml�Rk-#��<S��
��T�L�͸�d�)��[�y3�60�ݨO�[�a~^/��;�hi(Ͼ�
T���� ��D��q��2��60���Yd&޴� �q�@'I�����s����B�E��-#�"�)�j�g��&[ˈb8���w�>���$�e&�揫H;i�U��t��6L-7jE��-#�"�I��,�͙���p����B��0P��>o�H2�E"ZF�i��,k{�ڞ9oA3��ӌ���pZ���B}ˎىu������F�U�ZF�i��2T2a)W�L��,�ب�ڨ��@L}�[NM�'����zg��>���HC9-�T�h*(4�'2�0�ޙ�j%̭2�N1�]��U҃� �@P< ��������x�x�]�Ƿ�yy���jU�7�f���͞-{ <����G�2�CΧ0�\8��*#�2�I�gj�1Ȉb8��w�>u.�͹,�ߨ�$U�����1�!7%َCV�����X-�9������h����dD1�[c��b�Y�XeanG�1�a!�Д� ,yD�⪓tz��M�3�SˉZƙE�� l�q۴q[l�~l�~��g�;Q?�Yea�;d�9"��\�,������N&�IwB&ݡ�)E���hJqaI)�%�M��yf� #��|S߁��&��2�0η1�\e��\�� ���an,�k3C���0���fvC���|��4�Mn��GS����n Lc)��u���m�U�Q�<�d�(`�
�<�`~����	h�H�x�����,8?�z$#D��������kQ�ق:X��2���3�SB�̴����	xI�Ċ	b��(&`�L�sPd�k08[:�bB�E���D���c�1���p���K��2����b��Ϻ;A��|����r����@�8��^ZF�I�)� (��qhQ'Y��n�'uZF�xT%RqH�KZfv<��ZL-j��ފ�� ��1�z��ܒp�ńL}���#���wa=6��p"������aj�Q+6�!ZFƵa���EX��wGA��?Y��+an��p�jb�D�ؼ>���&����b�-������N�V����TL-jF"�(#㵢�0����ea\�4iܖ�`�2�^+���h�����ަGA�{0����(��hL}�'F1�QF6{DS6�əUF:��!0�ܨ�j���8�I�j
��2��Ҍ��B���US�W�іf}'�WMm^5a�7��3�%3�� ��l�m��*#��������GQ���Z1gYl2��Mv�Ɂ�%f�ea��H����/����y5&S˅Z�qb�QF�enSz� �3�2�.sc�P?� ,�"������I�GV�>qS߅�	��VAX�j������4�՘L-Gj����	��&��!��$��V	����M}�"�X�4�����o��*#�qK����*�I�P���Wm^����q�P���m�m\����͞�ԃ�@X0SK-/�!�
��a��u�h��&���'���<6%��s��fal�p��� i�DV����=>�C_�!�ʈbx����VQ�W�&;�dt�M�2�0^F�sD�i��^�3N1�\GNea���0�-� #��1F��B3��ea�~d�9"��aJF�p�07�Ef�[��8��sDXh���?�����)��]��j2�ܨ[��eo�9/Ԝ� *�|9�eD1\7�b�,"S6%3��G�,���j���{��@`��b�`1�g�c1S#��ÏTD��� QC����C�\̸ ���>�Ԏei��e'��dbK[ØǴ�Tw�$��t��L-7j�dj�da��t�0����mT��Ѥ�I,3��:��t�d��g3e&��G���N&V�8���Zn�JH����I9]5�WM,ԷlN�r�jR��̓<Qgw�&���q6�QF�Ȳ;ssc�AF:����#�H�tn;�'��Τ^unn�?Ȉb�����B�4�	� �1��;I����_�]L-Gj��Xۑ�v��z_����-���4"8�k��x�4�ٶ+�+�|�<���H��V,n�0������B0�n?J�dn����I����On���_�|.�oaA���q�J��m%ׂ�`L-7j�$Ϫda�m٤^ua��\X�5�g��G���9�yՑ� ��tQ����UF�Y:�����*#�b2F�#�,6����e��!l���HF�U{�0G�-�2�0Nl2��6�cv$#��a�K�2�0� 3�\�Z�H��    ���2�F"��R���
g�9"�xI%#��an@6��qN�戰�UF�9}F��"�����a���BXP2#�AF�5�ӕ$h%�VQ��n�-ԧ[�G����=v�B-��yp����F-#nda\�;�W�#��(��L����""3�da\�;��UF��@�����#AأY��dj��9M��r�Vz�u�Hf l�Ķ�����x U/�=b?b���}������E�c3�9�9\�Z6r�� �		|����V��ǭ����7y-�������f���UF���I���l����(����X11qک��=�P�]n��(9da�
C|�UF:�u�L-j��� l�^uB�f|��pyS߅��ٶ�#AX���jH�-ZF:�UgL-7j������|��Sz�(���(�`3�]�g>�۔� ,|\^:9��H�9��r�V@�ضj3�٫N�U�-?G2�NS1�]���[32������١�#�8���ZnԊ-Ԋ	�R��4��^xy��O;��
os7���_U�����a^�ϲhqvR�HF8���N̲�/%#��D/�5���J�L�ŏ���c'��V2�qNd1�\�5�|B-%#�z�I�����jn{}s����B���$��%�yy'#�a1���mjc�2�\����Z�^GżN�憰��a�6�1�fa���7�޵� ��2��F�tkAghan#�ô�DX�+�anK̷LZFƩpF�#��H_�L����d����-2�˂�2B}�⑩�B����l����F�#��,���~��sCXb���2�0~��sAX�aJF�/[a�#^2�-1I揪��նtܒ�M� SˍZ��*A؂���,ԏ(�g�:g�P?2�Hda�:�������UU^yo���5�m����L�\��z��<ic���r����F�ߖ��E���Q�����(��cL}7���nMZF�|n/H�tG�7�3N�0ܨ��)�����+�z�8�I�U��ĳT��|��n:Q���]�M^�^�j0^��K\�`��R��`�LX�L�t��p�O���]�7��`K��,����2�?�v��s�p��ukb{�:[|^g��Mϵ�l蜳?L7*в��V�6��IF��"��?7�ɣ� ����p�O��֎2��vM��󓕏2��v�Mv�ɩ��(#KO%��dl�e%Ҝ�gL-j�.�VAg�&�����(#��S߁��/2�6-#{D'c'�,
�2�6��TL-jEjE6j�|"狼/�,1j-#��,���c���� ,�|/kt�H�e����a*�Q��Y�%�
�I���˫���.�y{U�+���ǳ�g�����ئ ��$�ϖ�e�	�ea&�0!1�֏2����u
I�Y-#�S��
�m����ҭI�FIY�Q�/8+��w�~d�VhAfE>�6x@�	�� �m�o�$�w]Ӌyy���jU�7�f���͞-{ <��$�봌����!7%+m)�\p̤�sf�zx��p:���B}@���� ,���ϙ%;?�e���a�ph���UF��.��Ϲ�m���6b��'���i�inK<-�� F���Ϡ;���>g�an�-�-���a�,�끭p=�9�Tp�Bj�|��q"l�H>�(��(�aL}�/��L╌ �3n~�7�ب�e����|S��
dR���>�&���,�ب�b�8���w�>�� �3�
�7�b��-q�i��B��i�(#��VSz�WWYeD1�b�P?0��>�¢�"�/��K�	�T� ���h-���}������ᾔ�L`P��U�e#7jppq�s��9؁�l��r�?nբg��?o�Z�ӟ?��g�	k'��0ݘH�MhA�8;��-��2��B1�]���
-#�ۜp3�-��4 8�k}٨bő#�v�{E�"/���і"[l�
;,Щ�0�������Z#�;����s�����/�ٶ�^37�k�hI���	�(Q+ܿ�v{Q�7@�J��]F��]^˵��?�����ӊe�¥^[y�Fz�/0���n�
 �Uw��j�D�݈U�՘��n�]��x��1_�ުk�j�R����d]�4Ɠ?��UO��T�7��U�^�����Lם,�=~����?��Jc,3�r��ͩ�9�-�4���0x��JLK�����sr�/7~�f���qi֤�JL_jQ'��.�O�[)�ea�#t�I�^i�=gژ_n������ ��&u��,$�W2�N2�]�?���ZF���)��/o;h\]�B��dh��
xM#��Tx�{c~+�0��z�)$�^�
u���}~�"~� ��~�P�
Of�\����F��F�x�n-j�Ba ڂ�i@�~-<��@�� ��v G��涌S�'�wC+A�M�c��ikQ'Ø��G4���2�����Ǹ�8�|��T���r6����]@�jA��M�������Q;��b�QL�z�Vag@�&����SJF6�x�#��LajYNa2w]����� ��'���,�(&���9��w�~H"v%#�m���+-##�)L�wi`�Ø��&vۉY�eD1�e�P?�|B}%#K�m�ۆQ$�����Ls׍��$b-#�Z�Iݶe9gl]�s����F���W2���V0�A�;p����~o�o���Q�x��0 � �5�ZU��S[���a�8F}��Ɵ"oM'��>�,��m�o��VL$7"�SZFƅ{��ИT�e�b���hb�ap=#y���9ɲ*��vG�~��<Fx6Ȍ�J�]�hP�E�r]~#K`��]��z7��������
��e���@�햲��v��/�$��%8��F�����$j-#�ɏ�bK�Tl��J8a��u�.Y�[��'\29i��X^�'�W�	���.�4��hA؜��X�aό�f����\&,��)�ZeD1|�*S߅��,�2a3������!e���l��e�:q���2������n;4WkiQL��g�;Q�H82���7�"Zu)�X8���Y�Db"9)�ɒW���IW<��aă�(��^L}�3�2�0N�0���) -36�ٹL�\�ɛ	o-#���S߅�ͫjAX���am�����9g:�HnD
�rN-#�هN�C�,$����pn���B�0��U2���oه�4ɩe����`"�)&ӝж�ۜ�{&����������b�P?�Di�-JK���׀��3
��z��-8O���`L��A�sԜ���b{\�����<kdn�5�H�9���r��qF� #��I=kln�9Ȉb81��w�>Y�7�����Yc˜5��YSN�0���E笱mΚrV�悰�y�� #K�_Xހ/lo�S�<0���X�Pz-��eҩ��<Rw��pV���F���\,�r.���Y#�ݳ첳���ˍ^)�Q2�0.��ҳ���� #��S߁��O�nZF֗��HkA�[�� ��ٓg(r����:�;�B	���x�/lA	�x���1�᫖�!���̅d}g�ea\.3�,�/�Z?NZ1�ݨ�̓��@X���׿&�JO�J|N1��H��E3ZF�E3����<;i��pꊩ�B����2�0ΐ0��F�=hAo�2�s!�E��(��6L}7��"ZF�>�ɛe-ah[K���!a����,YmK֒��z&���l�AF�y���ɱ��� ,|��5�X��j�8C�$s#YB�X%#��I�kl9W2��+���b�P?�H�*#��J�^�-ɷؖ|8��q�Hd���2�0�͙�=��Сm9tp扩�F}�భ9OB��sC�%ķT���6 ���ؒ�f���_�s�.��c#�X��������L^7�&� $�Hqd8ed��}��(&f�3��h"/&�� ,����$H�G�H�y�G��S2��9��i�#]m�XV�%a��g�;Q�l��ea�_�{�����v4��sč#4}����Q��qZ���bJFÉ#���iY[b+k��_�{�Y��V�q��9��Z��ت�".~b    �}4�"����2�0^�7] ����ʈb�j�`�z��$j��?���u�j��������F6l��Nq҅홛=3N�d��p��<8�� g��ձ�0i�v{Z�[ h�8ǘ3;u�/j�rhi�W�.�/z{}욞�`����������������F�٫�����݉%R�lP�B7��.�;��<�-�y��ImZ`��dD1��g�?xm�,�zD+h�w�xO�M�����{q����4�t�/�0y�ʟ�.�_C_�@�	P`�@��
"�_����^Þ���[���SȚ��2��)�ؚ�YSc�� #KؚNkM�%�LQ�ح�藛��tH����;����Q#��k�ka�_å�D`��� ����&L�G0п�BϦV���y�ۧڰ��I�g4�xyn^�I.�Jp~��{+���CwO�����ٕHa����.�]1(�_����Zu��.R�kd�Sk�a> S�N��E-ql������J�P���������|ۨ�������0�������pդfla��2���q��,��AF�9�����۪*��7xO���C��su@�>Ww��6jaI�,l���뤘
T��,6��ea\'5�%$fx�eD1\'��w�~��2�0L����Q��W���ʦ=�0X��%zRՊ;�Đ&�b����4��
�,�Ze$�V�U�~�-����iE����Q���)�8�ȘZ.Ԃ�UF�)�I�j��f@�eD1n)��Q����3[ǻ4�=s�g��Y�2�0ޥiR{g>�ᔌ(�m���bϠ�[a-3;5��3{g	�� ���3RǫeD1��`�Q?�P�7��0����"]Iكn[�[#�q�]��G^���ZU�獺�3�|�ٲ���ϐL>c�3No0��8[4��o3NoL�>�t �Ӂo;��w�~e��	�2�0�51��F�fZF��64�)��2�C�Z�9��!R�e&��|�۔(!6�ZF�kݘ�n�'�jb뫚y�Yk�Qf�������kL*��6�@X�J����-j���F��d�w�V�U��[	�݁���%.B�P��k��vK\|��K��_ W���3�ȸI���Ql}m4�]��d��,� :�J8��j2{�䞞����T� ����4s	m��&���~\=ܗ�	�s��lp���Ng��JN�C����j+w��V�p���y�����K8aLB2�V22N��b&�1��㈭�8�\�4�&k���(��gL}7�'$I�d&�R��N��I��4��IL*$Y@��JF�;'M��,�(&�(��gL}7��ZFۦ�-8�-��4 8�k}٨W����+�+�������h��9,��e�m�����L�)�����S=�/7~�	fb�`��A���uf)q��J�R�-1�?��q�f� #���t�WJ0rK��(�sKL}ꓭ��������E�إ ���W���Y����x��XF��)<�8n'�X�8�7i��k�Q���.�͍AX���׀�ȳXc���=8Yprk��t�F}�����Zl�&��wy�$�V�<g�^n��lQ��8�7�g�,v/��=��1�ݨ������ڳ�����R�D��>��˞<��|/˃\������.{�E~	���x�/�+�_�����B2����ʘdn$K��5��7�|^�8��,��2�����b�P?ʂ�*#�[μ�O;��g�SR�\�`�l2=�H8��q�Y3��x����@^�+Q�[�	��Mn�׏���������0T�+���m�UC�(:yv�PȦ}�}0?�
n�Udht�j+Ђ�f	� #�țY�u���ł&�G�MjA�#�L0�H��9������c#5�q�����J�-������ )� �p��,��{�$$��d�S�7�3{6�|��T��"�gS�3Pq4JF�o�2m�e�T(F�;a�fAir|fK�\w2��,��,�q�;�b,hl��2�| <[P7Jk�g���Y�`:��[�G�-ˣf���o_����22�\���łγ�T�+A�*�؂җ�s���Э�䋱����-gt�B>D�-����Źm��!j[�����Sf���_��K$�%A��r�[�	_�_�����E�8�;�$�:"vnN��4��4y'���@b��Г4g�[]����Vʳ�-���K��i擉���lA������� #�q�$�,�Q���~j�#^����͞�uc�m�Xīz&�g�S�~س�yU��gt��ԲS�,�56l���YL�=�� ���Llϒ�*#���é���Z�R--�!�[�m�ގ��W_c琒���WEխ�Wu~'�'0b�^�w@��j���mۈ���Ms�i��fa��ļ$gR���Խ,lu/q�۲i�,$^T�H�xY�47�ZlZh�i�,gb�f��5Ȉb�ߚM�[D�eئ�ٴ�B��B^(3�M�I.MɈbtR`�?xm�,�zD+h�w�xO��t�{q����4�t�/�0y�ʟ�+�_C_�@�	P`�@��
"�_����^Þ���[���S̚�J���� �E3lM�i����ZFƋf�����ӽ���I܊,~��jH���uu[�����^D��cw�ka�_å�D`��� ��<uđ���ŭ���Dm��L�O�a+����h���ܼ��\69��� ����Rd�{�P��pgϮD
}=�<�t��A)@����f�Ъ���v��]#[h�ڀ��l:���ı���>�+�oBUf^2�����]jԃ�hyF
���F�wz(G�̰�1�~:	��bG��(#�͊���ڨ�elV�hQ�[�;Jv���Q�eh;�v��8v�n��쿪ea�nRG���ZF�VƎ���q�!}C�e�-�L�����d-#�e��:ʈiQ�[�!;Jv���QF��2�������x��s�.��g��?>k�Xf�x��Tك�xp@��Q��Q�x���<&�z%#��d�Ԋ�0�r���ZqhE���2�N�s��${�X�1'�'u���$���(����(�tG�е�ZF���zv�.�2�{�kA'�'u��%��X�|��gGɎ����-��sN����$�3�� �s�;J�z��l;��ĊI�m@��(�s��p�X��	��sgb@�_�p�%bg7J������Fz�M^TM��T7�Xmry�G�g�j�/��{��w�'�M�������}W7]ޢ���pē77�
�q�l7պQ��o盪*øA<�n�xwr��
iik�x��X��o��l������Z�Ⱥ����'�{�D����������Ɨ���c״����;����߽{:�F�k��p($�w)�{	�ߖսڝ�^����U]����@_�m�a�ά����b���'�\.����W�
����u���o�eWA<���nw ��m.�����]-�Kx<9�'ܥ^K���[A7�p�\k��]��B3T/���_�u����5@������7mq�_�U���B�灋>JT����C��W��ܷM�y���� M<���n��%*���W�s!�.�b�56��Bt�IT5J��t0�Ѕn���xz���o T� h�ΫV+��ꛄQ��0�^�=����u	_��%q�׀5=�瑩�[?�2��75�x�s�Aw�>�Q�=�@>��J6xP�%���z)�z
a��i)n����rƐ�)�{����d�Q�W'��R�L�j긑�|�V���h�J!~�9��бSW��ka�ph��ZuGEڛ�(0Rh���K�/ܷ�G���a9��ãpxZ 0ݣ
�������4(���`��`6N� ������i}nF�B�q45Z�U]u�hߦ*{:5�[4�mD�(F_�N�}���.�zh@ X����M �oa�Ք5����^��=Jk	�W�ڡ��g�#���R�8�[�]P#�n,Xm�i����-r��qv]�����A�;����������h�
�k�9��e��(긧�ѣ�зW��\ՠ�^�����b    �)�*�v���c����,npP��������b���!���8���0>�V] ��ib���+��@%0|x�S��A�����6%�� �[il�ڷ"�O� O��)��R�s9ȋP�(� ��摒��%hW�QUGa��Z+E���������t�Jz(�+a{��;@����;Ϧ+�+��h]���k��M��߽����%bb���7|L���C������������V�~$��ä���
4f�罄`������lܟz1|K]�vA�t�UJ�f��>fh �ڤ�	����������Kω"��B�����:f���4w�y��K���S.�4�h/�[l΀`�-���{��I�痠�
�B�����؁'�S��EU`4��}^{�\A`�D��l�@/(����I� �T��U-n���l�=���P��[a�!�a��L�F0�^�`A��[���S��e�P
��!�D�_��O�_� A��*�)���8^B`B�V�0ṣ�P/0���e�h� eUT��#{m)��R�荾f�>�&���;�#׍,�ʠ�����L��19�Q���3�0�l<��[��}ެ!��8��iZeo�	>$� �>��gQ�R�<��M�Ak��^"V��Q4"`p�o` �]�+�,�K4�-���{��~S)[��M���EO�$mn�W�'�����_�=�@�;�=|p]���
�..�C�K�g�#Q�;c������RǱx�>�9�}����͞���RV0q�; G6�}t��J��q@t���[]����u<
��>�g�s �w�|�����+L��B{�nP�b��@V�3�������\@�E�q@�۪���'��=�eWk�Є���Ʀ68��bXd��O:d���o%������䀿Z���xf�-l:=7Ԗ̭2O���2U�s�
���G[y�`���ǰi�B%�U�Os�^�k��vK4�z�\JtL�^�->�w:���j`���ж~��?X�?�p������h�\˶M�U4pj��V���g�#���DC������!���zv3K{�k�[������U�_�W�X�8Q�Nwu7��4�3]}B��X�d�|���XF��\��o���<�Z��V�8�Z�I_p�,�33[�̜k�Ǘ��c�����p-#;JG9��NhA�2N�(��3��s�edGɎ��7�e&[R�edG��(�f�3�f�)�2N�(�]��]�S����Q��|<�r�$�W2�>ߜ����[rs[�"���'v���y-#�q;��%;���(鞯s۞��ۋ
v��(#��P2s�B�@O�]os�JE�������:���|�k�u���as��62z˪���.�ί ��$��էc�לÄiÄ�2C�-3~#0�bHM�ܶh3����V�%���)[p�C�P!�Tͤ���&����hp��	��th1`���K��]�
'k���~7����^ᗃ�U�����|�|[����kqӊ�w�����R�Y~��.S��ZZ�W�ҫ�YD�P%#��"a���#P+AX���>�����'���Ýl@[K�j�m���$sč#��!��=,8M3�{�;����)���9_��`��U2��jZv��(�P���}�唎raYᰰ�p��S���@}@�xR2��P�#��@�:�J��>��˞<0�[�C`#˃\�C.ϱs��^���7�	�� _؂~�.�_�j���Zb�����%*Y[e�\������E$C�da��e�}4��	���ǹϛ9L�\�,	�2�N?3�]�g0]���揨�Awrn�����w�Z_:��)V�����儓z�Ĭyd�b.'d�Q?&q[b�-a`J��J�����+�������%Z8�#�����I���d��\��Tp��,� ���&��d�ľ��<pK+���ɍa���є�P}_W7����u=��ͷjh~T�ҏ/��
�8�����gZ�-[��, �lM�;�>��e�ߡ�n�~ق�-D���
flA���!���,+,�o��w�~d�~d�~�y�3�Xr���r�S��
F�� #\e�sA��\�2����kl梔AF�%'L7*$$�XX�}����ؔS�(�B3��eD1�m`�;PД�/Ǵ� �P< ��� �m�o�"�+�<����CWW�j��Q7{�u>[� x8���o�O-#=�i;sȅCQ��!-#��&u��B��Z�r����B���,}����ߨ�����!'b�Cn
��V2������3��ZFÉ'���M�UF?�rt줙|�2�qN�0�ܨ��4�-#���dR�:�/���(��QL}����� �a��D��Z�.��%�[/��[h.�J����b���k����Z����-qߤO��>�?������0��h13�A��s[B0� #�a)]­e&�b^l�sD�a����1'da.[d>�aJF>�����6ga{�s��F-��ca{�s�ݤY��$@ˈb8!��w�~h�~h���֛��$8���r����F:�YX�0\07�L,�O,���S߁����&���DX�V/��2 ji(�Y�
nT S-#㺷)�`X�X��i ���Z��e��P4���88N?Z=��qƅY�²����2�0.����F�I@d�p����F}�tA����+̞/��WU�F�zD�ћ�%���"WM��&�u���9\�Z6x� �]t����3{���V6W[���ꕧ��79xb���o<qL�$��A8��Ltcbh.��2a3>�jb'�Ynd;bl�	.����,"S2����ۼ�����4 8�k}٨��#G�����:E^nǋ�GE[l�PQN5���6�F�H��Mᵌ���H�/~%��]�¸�hR�
��רZFé-���g���̖ښ����X����*�]m�-}�B!���yx�{c~+�0��z�)$�����펊��y�
��^����МBԈ|,.��w0q�#���N"��0i�;��8�Ջ��G�\��edd97��u�n�R��ea\�4��N4b�2�N�1�]�h2��j�����n�w���I]� 3ߨ�j�����?ͮ^�g���,��gc�e��kd��іUs}a��q1�tA�R���� #��4(S߁���ܡt��qtJ�d�� #��4(Sߍ���*#�Ӡ�����F�p#pB��7y�5;
���}�'A�$�N-6���bU&���e����Mn�X��*#��$ɁHQ@�g-#��>�`�2��I2�ݨ��E�L���o؇b�,β�A�)(&��"3�2�0NAM�Cc���-�SPL}ꇖ�9���i�[��a")�&'t�H.D�̒�AF�K6'���Y�:��,T5��U1 ���"o6@����{�J�=}:;����}����8q���`'��Xv�[�|b�*x��nr���B��2��mS����4�зʈb8q��w�>y��ea������g.t؀�}��)����<h}�����Zl�eU��?~����Y��e��cz��kf���J/��Գβ�P_Ɉb8���w�>���l�S���c9�f����fյ���s⇩�B�9���2�0��ԫ�H"AɈb8U��w�>�疀:��G�y�I
)N
1�\H���*AW�M�_YD%#��Sߍ�1ɋ(A�Ea��hA�YM�\�$C��(�-oC�&7���GSC�}]� ��R�����6ߪ��Q�<�d�(dӂ��>��i�� ��, ���mҋ��q�����aLق�u��	]�ea���Z�Ĭ��2S1������e>����a�[P:��(A'8&��3�p�AF���b,(�g�P>�ق�u��������%lA�����QˈbflA	�t�5�ͱ.ba�fAc���;~��LlAc�k�{䧁[�cA��W2sC�d[P��4�6���-���>Ƕ��4ق~�s��W��0r�[P
h"DU2�0    ^�4��T�Ƕ
�4t+��b,(Y?�edݒ!lAق���#��p�tZJ�p�B�2�/ƂF$K�ddyE[P7J3�s[�=��g&���%x�i�������*�I�P�*��j�������g��_'�_Gn�	�gl���-#�5�V��YjI���tZ�V�Y�Yj�शN��u؞�سԒ�Jm�����Ll���<ZF�^�s�3�OIm���Wϰ=s�g41��C���؞���Zf*&�D���b�?�CKKO�����b���cǮ�R�CJ�������������F�٫�h��AmYS�eF��_�[�/j��E��5"c�#�BbO��h�aj+4�y�Ğ�l�eD1�o�%��'��O��ئ�شE���JF��&�i�, os��(f�۲iz0�����J�in6�.J^�%ǼRgb�FS9[*'֩����<�������}�=�ݲ���N>�� ҙ�H��E+n���8�}e�'@E��=�?�*�~UC?{{�7/oa@�o��Oy0kJ�}�z��W��5u��tֻ��z^�3�5��1[iL�V��MUC��ͼ��}]��b���BG�9��x/FQ'��@��KQ��la�A���y�t?�#�ߋ[���[��~�n�j�Vb'U��0����?�e��!@	�b�yo% V�u��I�B�Ý=�)l�������+� ��R֚�C��>��E�v�l�yj;m�4��D>�_�Ǧ~/���>��	U�y�x���{<�Q���)d�?Ba��%]㶰�qKxq;JG��t4-#�d#��^�ga���UF�ɺiB��"��(�k�&V��P󑌼�G�@xŪ��}dQ2�]�e�5�	f���0��*#��DF����"��� l�HN�<urf���q♩���
�0o�7��q�y��Z+!�ʈbxM&Sߍ�����2���yU�I�,Y���ZԊ��~�cA����q2�Zˈbx#�_�w�E��#'�؂�X���(,#���I-hj�b�,H���WL}�YL�����c��j���VU	��|\�vX{� �H&x.����`J�ZFʋ!�
.TXd��*#�Ő�z��ea]�0�B7�����"L��8I�sA��,tda�K#�aĆY�,��N�07�Q/i=wΉHF���YD����qu#�ai��|-#{L�m�����4��(�ruSˍZ�-Rb��)����ga�Y�ZeD1�؜T1aGVQo�?�b��_XeD1�dg�����ٚAF�|���Ш$C��4��JL*$f�8��� �I���ټcQ��M����'s[Eh�L�����2C1�Eċ�'^�Y�Ze&k��H�%�I��U�ea���I�� #���L*,,�pa;�p���IC��١2#QL�;�CX�}"�!�22�\��������E����nlSZS\�n殴�(�sW+&!6YɈb8w5�b���T�2��]M��(�ɫ���+�g�L��$���Q2����R1a�E�Wˈb0��
7иmg�wahn6�ȝx�� faDU-#�F��H�� #�,#�a��K� #�R$F��YH":%3��t�󢾪�w94�{24��>9��� x�{�~+�2��z�)(�+�B8�ow�|� ��{�Z�ZCs
Q#�q�J��^��ЧLA[�;�6�̻S��S��VؤH���#g0���yy� �ׁ���5Ld{��y� #�a!�DiAo��sCX�Xe&��Qc��!,�ذ�ڰ���c��!��z�2�0..d�� ,�x���%�u	#�a䅜����F�#�HY�0~]�sAXL_�hA�.a�}4�",Q12��� �s��07�����0��3�\�^r��qN�悰���g��EA8S�X�^�G��y��Ou\٪ͫ�{{ (�>�%���>6;;��t
��ɅN3s�AF�/0anKH�9����#�a�<K�� �_`0�\�f�iô� �_`0�\����*#��0�%���� #��0�YXea��悰��F|���F���YdF�ZF�/0a��ϊ1Vv2a��a.�-nA������j���Zd����@-d�1�>j	�j��`� R+a�˯��^����R���B^�ϼ��{�?໲��
�P�mW��Q���c^��o���R�׸5��C�����?�]�7���Օ���π���*�,�a�c��EL<&ާ/1�:dj1C���)P�Y�6�B-a�1�>j$��YE4c�1�>j�S�	5-#P�3�j�5r� #PKj�O�Zl}3��x���6��g'�d�bb�z~Jńa��VQ̯y�y�7_��E�l������ޓW�����y�fqzV�7�����_�����G2��_�y_���8+2�6Ȉ�b�گIk�UF����~EZ�;��q=0����c�UF0���17�Egg#�d�. �mo�d�y��HF��L(WB�h+�&���v9�So������]1�Z�v޾�@��OF�]}h�B�X�XL~͉�/-���G2�5�'`��������h�`��V߀�Ka�^W�ǯ�|��GQt��>��M`8�`~��[Ez�M63G�=�/�-���@�pЯ��H9���$=xr.�������w�B�S[du��
1���u^�r��4{UW{�z:`ȟ����^z�yQxM�Zɦ������7(��Ɠ?�媕koU�0�Nyɶ�����j�\-	z��E��f(����Z���KP ��]�h�(���B���ꃷ��K����>����+��(.�R�C�y	��()Ľ�c-o�BI�K�fUt�a��}^�-�Z���R].V�~ĦC���Ko��=r_:����������l�#`��j�K�xUﶖ��fÓ�7pN�)ESy���6�w��υ�##ח��$��j>��V��cը���W�O؇v�7������:�z��Z��zH-�rl����������r�����?��z���P!���W��7���G��u�[JD� u�7��\*$�e�1uƨ8=��x)'�N��X�� 4�-�p�C*lHU�p1�XY�6N8��k�A��%+���^藛��u8��}[C����G�����!gJa��k�ka�_å�c�=���x�Y���g�dt,����γ�Ak[��T}�����y=����Ɂ�(�!�A,;�@+/8t�$~���w��J����X�|vŠ�B����S��>��E�v�l�y )43�WӉ|п ScS������>��	U�y��<�n��Mη�z�パBv�#4!�4�H�Va�x%v.�2�0�ʈ�f��_�֌� #Z�)'y�<
O��*#�D"c�cIl���^
�17���v��L��8���p�Y12Ȉ�����K�+v��LN�ct���
?N�-�<����d�mw�hW�y[չ���

�_�A����.���mId��o���m��/�5�ޣ1��2�y���(��(,�L�W�G�����׍�gVi(O[��d8��ec<me�9cla����*���N\��1�8�8s�����K���� �L�c��t���w�|R{��nFl�0�a@vX�-�хV���F&BEAЈ�h^է�|�ߋ5�SOӭ!�Y��;jhō-�Ú��y�� #��	a�&��Va�>��؁��x���"ݶ��B�U���/�`�8�o�������\gX&��%�1���C�T�{����f���W��
��t	se�%˺*�]_6Ј��p[��[��F�8��^#G���l��ES�����8�Z��,ܱ��8ց!���b��l��P���#'-��r��<U��A�S�e��ض�]����d�(ӑ����B�%4W#c��7-v����j��{��v�)�C���6P2����l#��|�;��k���&~�q��Ufj'�t�����Dn�F�a�p�\�.�7yQ5��[�xb���ݰ�P-T�`d��r�Q]U޽�{�"�}W7]ޢ����֓77�
+ ��j�(e��|SA����Wu�B�N    ��`ik�x����-���T>n*xF��̷od]K��N��..
��ew#Vm��u�Ɨ���c״����;����߽{:�W��G
��]J�^B��eu_�O��[�����.����+\)�7�Ψ��s����/�<)d�'E� ��V]��a��N��m.O+��{\1y'φG���ō�����nB'�fX���._���k���_�-�\�d}~w\{���zP��%M�,$�	.�(�'����C���J�r%�m��v���j+@O����%*���F�s[��4�Z�	w��tRU�����8C������Z�{���;T4w�U�`�R�M¨����j��×�-<����k�׀5=�閭�f)�S-��ӫ:��0���}T��{&q})|�w ��T��z)�z:��-����9vi������\ֈ�0���D�\*��!VM7l��o�xqQ襨
9�{���n����B���X�m^��H��d7����K�/ܷ�G��պW���[�L�
��Q�[uY��kewv{0JCM[��G0���2�kmZ߁�R�?�hE�Vu��n�}��j:5�[4�mD�(F_�N�}���.�FPz!z���&���[�$�F�__�W�*����F���������R��j|�vA���1�`����3"�U�X]�O���ñ����w`�;�h����te�rR��5�åe��u����з��+����^�����B�XW�Uf�d���F�����Ai����+��~��C^7@=pR�������+��C�0M,�:��:�3<�)���a�wP�/���_���yb7�OѽK� 9nd���ǝ
PC*� ��]QFU����Z+S������V8�� h�Gq�����p�B�ǜ�to ��%@�p<1�s���vq������ɛ����j���
�=vo��ɣ�
�SKM?0��?DCu9 ��HZ��I!k�h�p���� 9`A�jY�,�����D�� o�݀*%G3�c+q/�c@���m��]Als	�R���K���D�
�V!z~St�w�`�s��
�p��%�[��#Ĕ�=��0�K���3 X�p�����q�7T���_A�ܪh;��x�;���\TF���A�L�����M�����4)������M� �M�Ǟ�S0��*�vr~�j�hC�Utp<��1T�2���ЅC�)�ƿ8�7�����j���T�r��2��x	�	m[0�>C���nz��F��UQݢ�쵥��Jݣ7��-`�Л�N��o�\7��7z�4A�3q���`�JD�
>���'ɷ����YC�qv�>�����H��(�EK5� �7^��mQ����N����p�57RQl3��B�\�����7��U��T���1�8nӛ[�����u�����wG2��z\�ot<������Rǀ���HT��������q,ޯmNq�8:jG&�C�'5sR{��8��; G��t%�R��g��q�vnu�'z"�o/�U{�xĬ���]�_��j���
s|��~�G2ȊS`�"�Q�9���h4�x��3��6X�8������Zy4�`1�z������0��I����tCs��$�z}9��W���,��M����U機�Z��j�q�Sa�9��h+/�����6-U����i��kq��n��VϟO��E��Cz��p�f��m��>������[�����w�6˵l��_E���k �_}�?bp_O4���i��}p�q�8�g7ð�����%ȉ!x��Xe�}�����U�tWGqөK�9ӧԄy�8KBc�Qf�S����<�:�
I��X����KU(�]�9�8��%JE�YS���66�}����O�L�u۽Ǣ�!�kS�h� ��:��B��)�-�3XpxUY�ڨ��N�?n��r���v�n� ��o���w^��^�׊��?}��_��_�zYm�54it���?	�~��|#j�{z��G��{h���޷��m,�~B���#y�iqȎ;~i-�g�83�z8�>$+�K\`��r�$�~U��ݲ�����Kj����wWW�XZp����^`m�q��3>g-�%4/'�hN�ϣE
k��4��&��S����*��%����-���/�kUP��P�즒�
U b�t��v�G^D��,Uė:�I�6�Ep�i�J�?�夌=S�{;��w{,;9�YG.�f���M�G.���1�9�,��k�����0��NV.	�:�3�:d�&k��q�� u�Iޓ<�ÎӞ��'r�w�V��B ��ƒ�i��w�Q��V~�k��&��k(��S=	�����fQ�؇V�����Ӟu��۬��ᤞ�yv�:(f蠘��N���X����]��R\N\�'>(�S��tP��ꟸT�����1%C��FZ@�aHl�w$��U>k^|`��vxo��n��br5�K4w��^����vJ��>2��l7عj]�l
�K�Syٷ3���,S����M�nĬ�1y�J]N��;����ݶ�)m�z��gy��1u��1�͢���O1�b��Ӿ%c�͢�O�����6�#_6˗��e��l�]Sp�3"m{G�}ߡ��g��9�x�Ϟ�C�DƧA��f���qlg;q�Y8&nll;'gy��(~&��\)��z��+����p��ml��$H�)Ӷ3���]�Y�ޅ�о`.m���V��s.Ϲ���qU��dp�ݲs4� �+4x���UP�%��������(6��dOܔY�,3r����;;�j��4𲜱��^��ӑ���h8r��H6�B�htڵ���%�<y:ډ��Eh�6�Ɵ������]����w^xrؕl�r�0,	�����#(FM�P�Aj0����?+���%R��{���ܺ{�G�m�( ߖ`�1���I'2�V*?Z�5~,ңh� �l�Q����N�qhK#G �b�Ը+5��i�N���q޷"���0��B�`�}5�\��;�6�H�PS�4�A�[a�3��w�Bz�U~X��ni�zf���{�����hl��1m6�yk�#ٮHַ�un���:ͤץ_#����!͇�����,b��^��r$f7�hWb�d+c�p�)�|z�3��	d���޽�7�=1�JL�u�����BL�)�q冖L$9�x ���"���8��%��4����r�$6�����^�wxە�F���}W-1B���X5��6�[�\��5�"��z�p�jBf��@yC���`/wHh#�bh� x��n�v�8�8v�q��Bh&$]��n���Tpe�}gtr�x4m�����dW:�[Z��H�KS�{����6{wv�|�?jK��6�C}d�AnP�'e:��(�������s�o���p����q��qJ3�r��m�VFb�i&��r�d�TQ�#����N�+7D���<���Q�yA�aj)r�f�t�y���� ��y��{��!<��/z�6����s�;r
}��,�x[H^߫�y����\j&lLu�ɴ̑�>��7u���ֳ��U�X���I�ei"��p-#dN�T馓��t���Y�͉�^��G�{%w7%��2��F�/��YP�����ڝ����)v�m�H��;=�;��;��j2������	*K��%�|p�w��wǊ��6{w&~w�{wz��%m��x���u�'m����v��w�N�I;��N����fɈ�S������´׶��͆�����=��\?��s߻3l�3m���8P�.��]:��A��f#�n'G�<��N��i��L|#���ζ8Nʹk7�$e�.7��{��\�*�.���8�bzw�`^a�W�_٫����6{���˓�n$vb��J��d�S6��U5ƴY�y�½������f�?����v��É��ޝ�,^��y��5jWޖ6���`�9Zg
�͞��m�;��/��6{wF_�E@+8V?p�ޟ��;n��{L��;�r��������    O�f#���c����X�f��_�$�+��||�����礹���ȩ��]PO�Ǩ}0o�l$�"SH�rt�sёOJ��hW:�[�N���L!-�;��%�8OG��Q+�i���S���Y�m�L�{�����p�l���N!�@:��+�d�=	�w��V��f!��W�BZ��0�\����!�ilW�]�#�K���L��(��$�|��f��˭Y䛆���f���F���������_r�D]���o�i:q��ᨏ��K������������I��|rB�|�wk�َБ�z�!�~w�߱#�b쌷8�r�s˚,b�6{���iWb�9�ɕ���k��-+��߱�Zڱ��xە�����l$�:�s�zl�u���;O<��Lhn��k;�,�s�t�a9��K�O'����r2��7q'��)\i��;�e'޻��cW�=�c�~�os�{���t�ХG]z��O���A$P���͆��� ��0����5�&>3���vF`�f�ώ�Շ�ԇ^��ܴ�H��dG�9���!mּO��8<q�H��|�6�|��������I����-�÷�[jmG��ِx����t��C[�$�����1����Q��6�7��l��O���mٻ�]$Ց}�\�lHz�����:�#cOv�T����J3$m6$'��ڟ��K]����ݬHG�g�����D���F�8���K����J����td���fC��՟��e����4����� ��ڧ*�fC�Y[��0�_��y9#]_~�UO��_��MMj�(MF�� -�+Sy��cK,#R��Q�ċ�`�W���_���tzo6K3�RBm����L	Z3=��0	�uL�Et�$\+B·eC��!��(8cdŋ!�/����̫����$A�L��!):O񉡱��2u��YR'���*6c�e�U)C�g�<�E��P$��IR"ĄuM2	 !٧jӥ���:�Vd�K3�?e�1��H�5��I"g�2�Dl3��1�ӄ��S��v�YZ�s���h� A�=�N�Y��4�	�(K����s0���	���r��$]�����5�ǊV��G7�=�[�Y�a���E�^�������4:�Xx��"��C�f�i���F��"��M��^H�Z�a�x1Bnp�Ne���EF,�~K��K̝,Y����*"t#h�7�F� K��O�:/gK ���RՑ�`���
���'WĲ���@�Q���Q#�����t�M)3 R,	v4rn���P3�p1 T/������\㚺��2�A�i����դ�I~�2�DL���@w�.�����!�@�>�Rq���4[�K�y�w]�۠����mO����;�>I��ِ4��9K�Gd��h�GCG��B�p��3"T�V��ω[�"zȂ�p��i�ԛW��L(�Ȕ�:�,Y�*�K4
?�K��^��0���s(��rk�E8�Re
���(�>P/Z�8槅P�I	�7!ʹ\<ifA�v�1�t��=��&Ê�k��VskޡwfqY�|e��J/�'GF� zgN�	��(b	f�Ef$����)�a����x^��(X���7�����5M��J�\�q	�Q�T�N�H��1%�ûA�A��y�s2T��_���������g��[0Ly�L]E���A����?���P�����q(��܋6dMlv�>��!BQ̃pC�i��V����rU�S�d0j�	<;� �_h�b���'	h�[�}�¸}�V�-	����f����~��v଴Y�
3������amnt�.�p��[�s��YeZ��N<�W��	�<C� ���	��j�����{����k�Mcɠ�z�v�5�#�I� ��i\ E�Y��;��ݾ�ƛ����|�s,����FH���og�x���]N�g���m`�d����20 ��R�n�Z���-k�2n�h�Gd<�y�c`ymC���vOwH2;�\�l��Ո�ۓ9���פ��(#k��4F;�s�C+x�:σ����,/X�c�-�2J$�����,؜]oH�����K��#�Q��E뀮�okFsk�e4[i}hV��֤��$�E�Q�q~!�Df��M� �S�R�`!�k5%�c�����8[Y�x[��&��>�'���:[5(�o��`gi�K�<�.�^��l	m���u�ڕ֭��&���B�i<��-͂�����]i��#9�Hҫ�l	/Y�W���2%޳�&3W���Ԣ��%8GW�Nq`�v�,���`�Fʦ#0ߘ�Fgl8Rۖ8&�ꚠ����*�<��$g-.5/u����7�+g���b�C�\k�s���j�qM� �j��6�]��kQ�xFF�c� �-���3�̈W��XIk�r��FSk4���=�Ѕe*c�A��µ�΂	�N��&}Ը�@��q'�+�.����'�	aN��_'�ڜ�wj��<Ů���5/��~' _+�2����	9�1�$:$�f]aAevE�;��wye3l,�P0>��%#� E��L��:ֱב��Ivg[�#�RJ$�]�����f����~�!Mں�(m${�V����W��ҏ�1����v�o�1a0��=��7b ���߽��zNש������ �@G�Z��o�����r��69�E�B>��LD��m��=̢�����
��=&-,�z������?{��7~��3�D��?��9�j��+_�����~��֟��ޝ����y��&m6$G_?��څ\M���
�Cxe;?{N�gO�6�Ap���������=})^64<}�:���Ϗ��:���	�{������<{����;]��u�9����.u~C�0h��J�I�����>.m����&p,i'��[�Kx� ��oO�/n�2]�1*Z�	��^��'x��?�Z,�������w(}���C����S�ڴ��9Fbf5-�	�4'����w8�7'�2a�pƱ���Ѯ�t��8����68?��@%�ik�QI�Z�&�'6�7�Q��!�!�,�Tbf��6���os
y8��S[g��ۨ5a5�l�:�2�����7���u�~��,�r�
���u4*�"sA�B5�<�DF�]W�B�TgBzU�-�H3���$i]��cHg��!�K�%@ȹ�MȀ�>�C3�vD���U�����A����0�]�� ����.D�e���I�0L*v�៫��[�0ÜS�'|A��� �{:������o�]�Vҝ������F1��I� F�XM����\hL��S����2�F�ʈtqܞ���JE�a.I'�k�Y/
c�AT��./3u<�Vp����a.U���J��R���%ڗ�]/��2Z fDN���&
�F��*��DFܙ�_�gg���Z���#0���s�����%�
�����@5n���
!�ΞLL3�D�k�X�R�M��
/l'�?��c�ef�����p��J�	�,��F[��.W!_r5�NI��р��+L��=��2�j����[؉T�O���i𚐕�M��h���Tѻ��}p�?T�(d����v�W�I���%��6Ĉ B�(43Go�U4�%��L�:���&���2&L��$�����)1�H���C��qT}|�)e@��v��N� ���ÀqOOI�gK�3Q�YYH�ցEr:	lm������e-9\E9�K�gY�~e Wӣ��䦾�ɶ�%�P"b"�K�t�L�c_�0;�y	�0��$����jÞ��P���D�A�m�k�,�y�2a�,�@�.�&�oH�����+~�$���������6&ўs�5�,�]��S�=_ȪEsT,`+��"X}8b(O䘐(LӍ�,4;�����F!SxY���<�4mut�ԯL�4O��\C"©1w�d�d���'&\B����ǔ�ɲN�=�&gkH�-��8N�b>t(�Ȕ"$Ѥ��̉&�U2�"�(�j[g��(��. 7A�4�&w6�cz�Oh	�a�l0���Kv��&<�ݦ�F�.cU1�&���dr�3tm�c�p�Ć����W���!\߮D*m���}����LX�lH��z�6��k    9���ޝco�y�̛e�,�f�7˼Y��2o�y��Ͳ�iϺ$�m��:��LFvQ-i�{R�͝�:�_.ι��σTG�/��7K�>$���	�f�P��:���V�%@}q��2�˨0A��T�ux�Z�t����M�?_�3�*��=�:8ۘDj�k:W�S#Z�d"$V�w�����b�.��;$�ix�'R����u�����A�D��$����L��Z��G4�u���k2/�`Ey}1��fQ׸��͸�X%:S�w{�WZ��A��^�K��p��J5��<s���nj����S�׀pq���m�N�~�P�Je��q��:�DTu-&^��߆������AP\�U�Sڝw�<]�PԮiT�C(qJR6�w�c��@=��q(� *C)�wՋ��-��$��5�W��O�])�u�^�"�H�:Ak��!��\!�l2�j(KN@�ʔp��D[*]��q�{`R�4ь����P��q�����{�uv	��RsZ������E�g﨡�e�^*>����aHw
q�<��$�j;�`xWx�mRƜ�\��ۥ�c��t8E�y��#D+ת��
/�|��Lp4D���U\�17h��-a*��֑ɕPe��i��Rݩi�F�_A���@S������2M49��.r�A[���~J�*pK �btƸy(w�K���ih>|uF_��i?��n;���B�@K)�$�Svl�>̖d�
����r�`���&?Ts�_w4�9h8����~9���HLL5�N }��rED��(8�d�tߑ��r�]onNfL$�/xo��m�r�u,e���%Ɏ�g�~�Rs\���XGNqh%�����%E&��̱�Y[i��$M���y�U3v�tjwnf�������n} �R9ɡ�E��v�$�=��v�bOn8��f��nLW�'��J��D�?�M���9顖��/��k���(x�·�"�TSa�eE��6���9.��-��x�0�e�B%SB~�0Z�Qu�e�?��*01f̓�yH��"̑t|���LU_��+|��\��v�	�V!C���j����I{E�M���z���x-�;NdQm
s�2.�v�Y�����=�*�L%��Š��-��jN+��%�H�"�>
^���8��i�S�9he���$�{�IG�}����X���dr��zU���Y���e�e��ኜ������\jL�B��AU�{����ze��V顪�����2Cgh%��������H2|��$��L.Nj�c�Yח��4��4L$��>þX���j����}E�-��3�Mi���X��l��������\�pb Ƙ���R�v�Q�φ`h�y���|N�����%��$�"nB2��8νk	��&A�9���M8G˜F�	�%����/�UMP#A�U�%�Ֆp�˔y��2MU�3�R2*�W�[�ju��m��o��i%A1^�������ì@��5U���Q��"T"�5r]�'{{0�Mf���ȼ�ճH�f=����W�Ϛ��9<��\SI!SW�*s��u��N�Ub�G%?�O�������Fb#����5���	M+��V1�>��WS�;u[�բ����hN�UѸ �|:g� >�1�RpS��Lc�a����_De7��D#�|3E��wꐉ�2�=}f��؆�y�ݚ�^���'��Y3p�ˇ9|��ظR���*�U5��hzM�c?os�lB�3)� �	o0�z3sӶ�X�o���8�_�/sa˙B
���gm`;3y����p��ψ�}AEZ¼�|��c=p���c�,��F���D�c�%պJ�yKtb�z"�N�Zӛ�K��Lw���;�T��3���b>�K�H��Xb�	��Vb5n�w!���H��0���ʑ��}���Z�2�{�\�|D�<�>�=�O�<��u�1R��G΋�	6?k�yG����!A����i�x�;<�>��c�t��>��G�;:>Z'�f���+bCǎk���k���OɆ��j�f�s�m���6qƾ�|���%��q"��1��qp��+~�Vح~�0J$�bϺ���/�T����&M���y㽷I����5����o�9�NI
��٫��/^�z�g���?_�z����i��zhr������
;�lb�lG׺k��kw�*�p��`��UQ�}�>q�E�䘝L,�������G��_���(6��z/���������G����?�:�����<|�����'{����;x���Ӌ7/�}�$�?�:���Ic����GY)�R�}���.����/�;���͏g� �t��f�Ӟ�*���_��29�[ҹ�^�Ͻs��Qj��f�)5��p��'*�XW���`�"���h�t'�~o2�L���
�����M��]�U��1p7����ѯ���9�%�-*���(;c��v���3M��[l� ����^�.�|��wA�����6<ؼ�e r`J�$ȵPB$���nG?.�����&�o����D� b)r�%<9
�i���22�`Z�*ʁ��4.���HU�d��FYO�ŁI��=$:`�0_�41�S>B�g	̦��-�f������7�Zd�,B�0��y8�*��&��.Ety�����!�F.�5��v��aO�����3��L�>���o�G�6�dz��[|��H�>t���=?����S�G�q(m6�4��&+Wl�2+�-�'߸Q�H8���*.m����%x��YȣmZK�M2��p०���9���S�}�p�B,�
����y'ؐ��
��!�^��ߐ�>��c�������<��\�E����������6;h�����������N��i�w�W���36&���>Ñ���g���v�٪�^�r���j�-����nu���V�6{��<k��a�Ag��H��|ǴTc|D��L@���K5��N4'�O^��% u�J�(�;W�!w�D�v�Y{ߴg"���F_���k���^��O�w{����o��6�d�a���ǰ�XQ�����"��/� �|x�0��?_�:S�\��?Kh���b�����@w�=���C�<Kqy�׳�&񷌺e�����S�'|
ƨ#�n��8���"P$�%j{��w�`ܾ� m6ܽ�ڳ*Ϫ@V$���$#N�:6+��6h����A=��)��yD�[�� �0��:��<�\~����룥|{�K%��%��Y�f/�{�=��\�ɣ����換Q��-0�K��d����S%�e�@"ųE�р! Eڱ�7鶈��Z������LH~ɹ��=���#�9Do�jU&��!i+�9.u?U�Р�-J�k~�Od�e%���Ԟ�����4]Fs�R��ڛ/�"��u��#a��`���gD�r�7�h%��k���M��VX�K$r�P�ΣE�Dh� yZ;�C�9-����*��%g��>1�Y!�k�З�B��#��7�=�O�T����yQig%�+��f�$KjG��n��<��%��d=}����j�ΕH�`��ٸ�O�x����aw�J��O>���BݱמfkEH���c��D����8�\�=W���^h��Z2<�Cz�����<���z�v�Pl��s�ӽ�{�ǰ}$m6���@6�[��B��'�N%$m�Ľw�Ӻ�u��ȡ�\j���i̩�6�h��Kߥ+�Q��X�E��q��
�ns�j_Bb*�p՞P���C��=td&6�9؎����e0]��U�kݩ�S�s��Y�'ݶ��o*[��w��*uy�.�ް��҇��c���L�3����۾*+m6�����~��ng`�x��-g��q5�|�ikG�C+�Ҵٛ罷��y~^`�@n��1�N�����ȉ��ʞ�(tʧ_&�{��jB��F 7*l���5u��-����m4&���g L�?qz����X��=�w:���e��6�Sy�4�'ޓ����Lֱ1��$�
�n�@���軄���62�U홉g&�x��?��7���f��@ۙ)�g    �P�G���'N�3o���I��8?
~�P�0u;���".����h=)���Z�1��V=���6�
Y�\i�W2��+����s2�G�]<H�l�9��a��:�p�:Ã'��J;�Q9�&�gD	�4`D0}��}�w�W�� ��$ �Go���U%������fuQ�Ƀ���
o���^��28�=��;K�a�:г�I��4F�w��Cb`�\U+$�{�hPv�1s�&�~����O_��<;?`Fx�{�{��:�7D�XN}�eN�1t�ڤN8P�/�P�v�A�C��5�#�xL[�A�8>nlJ[�S�
<�ҟaV�=i���ĳ��gV>$i�v��+*3�Yb��^�O��	�Ҏn:��N�_�)//�v����_[���s4t������#��șH�D�p2��4����&���5�����\�y�&4�iiʺ�z�K�Ȇ���qJ3�
���,�[e���`M��N�Z�b[i��Z�W*K��=P�QǜG���7/�X�{�=)��Q�&V���Z�ʻK�Z���l��=v~���:r�'�����·�0Rkb��UA�0J
���07JJ2qm	w��5�Lu%��x�p^�Y��/�l��q���#�Z%WQ�2�q|\fd��S��z��-w[�9o\��ff~CXڷtn�!y��RY��d~Q�H��V_`�7*�$fFMj�(MF�� -�+S���pa��� .���&^����,��B7����,�K	�:BC�3%h�����d�n�cz.��$�Zr>,��r�2
+*�oC��/���n�Y�8"�J��4��"x��Cc\�s�nTHܾNF+��،p��U)C�g�<�E��P$x��HR"Ąu�����Tm��7�]�YKA�$0�X)� �i�G����M� �2�DD��I0EL�Q�dE�jG���2��h��14���:�cR�τ^�%txEÃ9APE�}B"��@.#=,�U����cE+u�ɣ�>"�:�5Yv��]d�@�*��4$%�Fgُ���,R=4nhƚ�9���n4.`X�M��^H�Z��O9�B$��ঝJ���$���>D�.A�SE�΀a�F]҈�`a)���U��l	����_�:���~Z�#Q���X��:�c�F5�@���O7ؔ21"Œ`G#�F���11�
���@����w,KB@����fsx���_5iUda�_��>�)�-Н����n���-'��N�Up�$��~׵�J�k�m�#Wm�~��e߇!9����fCR��M3�gxfyQ��Y��̐b�*��ॺF��,/X8.�+��2�3�9���o�)⛎\^��AB�V�XP|[c���?�h�f:��<��"��D��
��/��2o#HiN�Fi����R�4Mf���&%���0}�������в�P(�DKӋrZ�M�2P��O�1㊞�U�g�Pz@<����
�̗�&���B�i<��D���G�,�u	���ގĵ��W��^�z�f%AeJcUMf�B�+���q�
�.X�X��Bɛ"q��0s�%3z������՘�k�
��s�Qe��%��\%9+5�y	�dV��7����5�g_k�Isz5ָ&r�_��FC��9�f�.���y��x��=#�,܄>0V�ڲ\�G���ͱ5u�"@&A�!`ɼ�k���6k�
��d^����������*q��I�Q��4bXm�NMZ�S�Z˾��QO@�V�e�3)3c��P#�ű�� 4��Lc)H���Ͱ��T�����7D0����)6�p�XGZ�� Z�F#�R����
V�6�]����0$��3t	q�6�Ap���������=})hx��u���?u����7r������y��髗w�;o���w���Ǝ���+&��y|�0$mw����w�-G���W��ҏ�1��T�.�M?&&R���ވ�_��~��Է|w�f/��KY�ŻǮT��w�}�v.��+V����pm�;��Œ�Y�����h����li�������iN��Ai�����s��cIH��;�/=H�f�3�6{�#�����}C���+��}R��H)z�C=KD�,x�I�:u0u~�V�2��Шp�.�޼�;~�p��[A"Ry�e���&M���y㽷Ip�p�oK�R�~��SR��i�~��_�S<����Ջ���x8'ȭn6��R�����.~x�V��l��Ͳ5]뮽v(��)�l�U�lT�x�u��kh��H��;'>����Oe��6��������&?JJ5E��Rr s��+��_��� ��nNJ$~ۙy��8�o6K�=�'O;���k�R�f#���Ӹ�$��"�ά̴��B�]Q��X�%VǩKD>E����,�M~��������Q���h�E�R���<�,����T;ۅ���^����'��H���l#m6��
z�*�}D�����[�s�Ɔ�ِ�g���e�;�k��X��K�`o@�Q4�ڌ��Da�gj ��t�D�4q�`���
�H�s�r�e���s����&r^������P~pa<�9/�ў��&A^K��I�qC���s����<���G|!�r<��Y�i$����7��N�Q�ۮޏl6Eۅ����BO2���Bჩ�{��!��$�H
N�#�^�����F��Y9wC��(@Px?����9r��My��dι�1V�^�^����-{ �[F�:Zo��$�:�
䣞��$ДH[������_�Dc^N�bj�3B(m-^��l��+!��U*12��K���~a�M��
W6�0E�Bi�+N��d��e�(����O���ό~XM�:$.F���C���@l"�0"�H�X���$�z�)m�y�U�G/,��  �L�#� 'v�s�,Q7KH7X��BK�nX�EF\�j���zyC�rR���* ��|����re"�:��4�ÿd!U[0ʥa�����&H@~\�����@$-D��j-stɡi800���,��є�4ZJ��A����~��ݩԙ8|�����?IKO��R<�������ԉ�"m��|<�G�ܪ9%m6${���:9Z�~�f-a4��z��::�[�?M[{w\��Q���E�&D!�t LtV��b=ja��">���.Ƕu�m6)�����o�x{��;��ޱ(I�Ͳw;�������r9,ǁ��߻�sbg��6{w�_�CՌzV�J�fC����tGCg����z��S�����O��
{�8�l�������;p�ِ�~��v�������ڝ����G���͆�g����ຸ7��T��z=��^O��z��O5m6��,���t��`<:�*� ��CL���ݔ9���ĉ�ñ���8C�$z%�+�^I�J�'VG��uIh8�l��Q;(M��%����R�K/u����R�a׻�Іǟ�Ա�ǚ6{	��#��Y��N;<�<��߳�x���Su�
�U��xī �R{nKi�Y�gz&���*���K�3�[��6���Y�n8+��XɁ+R�
�*RR��8P̲��u�Q�C�GJ%��(�?�K-)n��
7vL�{�Q9�c�3q��+]���-�`i6W�;�����*�R+���S�l[��(�@-����˼��kpS�$JfqIJax�pa�LFf�Vn:�re�l��j��S��|I�N]����D1�r)�Fe�:dj%�2��>Wp�9I�<WaҪQW��~��W�L7�e�2� i���y���W�^/�^���X��`�eyk�C�%z���-TpI,B*�]/��2�V�(��j�4��Lo��5�Jє~���m�,�1t-�^AP��h��D�m�8�B�,�tNC�F;���*
V�j�����l!�m~��,����L��&�������s𡞋ɱ�5��Ntq��z��l|U\��"��{un u�P�Ȑ��LU�A�ye��7K�Ի5���t�IʼK#��Tט�C�_ni����:��|Q�r��x��t��lH���D\�q�	�]\����&��sQt�5�Wވ�    ���I�L���+(U%��i�<(s��dj�#�5�^�U0�K�7��0�rcS�Ҕkp�6-2���ju�`J�I��9KYQ͚鿢 5�Q�2�J�ա�� f���Ee���=ז�v��fyFh���ԋ�ք]]���T��4[�����2�QZ�0,��� �I����%���>�p�-$:�J��(%Ӝr�_��%��U�@ ��c��;v��,�3=V����Ɉ��K�|�%`x�C�����mj/�Z��Z���3�x�"��o�^p�܊��9Ӥ1�H�ϙ�yB��ԚE��\�/x�YUÌF�M�EP��}AX<*
����DZ����Q�~��~�ސ%��/toF�yt�G����3����-����<3S{��oLo� LX.ʬ�L�y�H��+����r�+Y���ۇ���֓"cNhL�Ri�CG�/�tmY�㭸(7�zQ����$ޖ�ս��M^�l����7G�X{� 8���A]I�mJ�	 �|�Z�2��'�v�MT���zsU>��Y���,��(woOC�9�<xI��ޞ��������t�� �਀Jj:v��գM{"ʇF<ǦH��ǚ��fj�Ȗ�c,r�U�%_r$q�w�Fk{��w:ǽ�Ԟ>�П6�p��`�i�S��VB(�}�k�s	���kȅ�k��ae�8@T�D�X�)<g6�9h�H+�%������%�ՙ��9Al��a�{�d�k&f�t&�B�U�q8M���
�}-�"/��u���ԫhF��B�7�ʦ��jX��E�2�r���F�p檇����\?k��?}�����īY��1Q����M[B0r��SS�^=K����ƛi-��q���n������ظ"���6��Vd�E�R9V�_�~���*7U/D*g�!�$/p�)�n\�ch4f�2�ؠÎf�\Jz�6%a�ɗ�@2��ת�>~/H��Q4�GC��*�g�L�y龂8�,�*fb��n[���L�УI����� 21j�IT�ЈL��#ezh�X���[���-�A�؄E��d�p-��sZ �*D�}�<4�#^GI��*~Ll�f`4͋mi�>�k�.35S�9P�C�#}]-RZ�����(�ɩ�Mk�$������}|x�������p�a��B�iB�[�؈����!qg��Ϟ?�+ ����9L��\뙄E��ً�$0պ��ܐ<,��X���c��!��������q�K�����:�%8@Ǥ_���9ּq��[UG�C3��5Yv}v;����[D�5����� xC�rE[�ֵ�+�r�5m?�g��#BD��B�מ�9�����0{q;e~HExL͸��ҏ��3^D��h�w?@O����/�˙���_�����]l�d����1w!ua�viF{i��1�qq<��5���[�Xѧ�K�4�~�v˺���o� �ϐ����j'7��j� ڼ���?�Ŀ�}�?�`�=�"`��f��ގ�is&��E8�]W)	]%�Y.4Ю�7�*4x���2�~�(����Ӣx�0>��f�B!}�N��dhS��ԯF�CB٘Z5:��s>hzj|�K��.��4�Մ��C�dR�M��������iuݾ���%��-���Դ�U�Ӧ��i<�R�v
(i�4�mA��d�vʈa���EK2����#�DA���b�fѯ���s�Y��O�ad�hzyD�L���f���w����A��V_�V��i�2�/ҹ"E��_�Aܷ֠ɘ�S�7M	�u�8��M^IxX��i��M��� �����<ztxqA�I1ս7�s�Y`�V/�lX-�_ϖDH�SyJG;U�&�_��ާ��KhZL��28��W�6y^��g����6}'�fѯ��Ʒ�e�p��S�/ۜ�_ƥ"X�*Ö�c���ӳ�[fq!�@OF���b˸h4��ЏX�3��,��[�eS�G�|�R�H������Ѷ'�\=�	� ~��`�@"=p�=���������1������-�����h��H���D��ΟUF>ki�\���i!��j.�3�Չ{W�27�+'%C���+�c֎[N�����!1;�I �`pv�}��Ɔ�T�h�+�9Z%�Az	᯾�>T�4\p��/W�U��[�K������O���5'��#.0Ӆ�k�ў���[���P�y�!}Ǚ��Ƿ�uh�D�!rEہ�3�q�� ��
���
�}I��{�={�4��J� �X�Z���e\�/e��HRH���!�z�b��GF�"�š�W��2p���>N�#�t�:=��s�e�wj��iߡY�]��n�A|��`�9�l$;��j�J*�vD������ٔ;�9��ζ���n
��buЏ���t8<��m6����y�#w�ӁJ��d�f�G�ݐl|ڵ�1��H(��lY�2`��~'Q�Q����w��v�X-�+��;�'Va@�f/a��N<�B�#���F���I5B6���?���'��tF���ܨ).6ѧ�v�U�Լ�z{/wHh��B�l�0�r�q�o�zf�+��[By��w|�9Yv��#mּ'>��'�]�c� ���8&���H�3�9Խ�Cݛ=�y$�����g~��ng��<�M^ĉӋ8��G�ݐ��kEq��d'M/�#$�
�"d�7�=g�YÕHÿ	���p�Z�w#�C�=C�*\�]�Wk����{��r�5���!�5�a\FA9��;F��ɩi���Bͮ0�;��N�Ui�@{�������Y��٠�y��Y㎬�v�8�'�t�aJ��
~�T�O��g�� �-z�t���J�d�"�U�J�l$ۭ6�G2�d'v�,i����G����fAv�Y~r������&��`R=�=]N��2��QHzB���ZO�S�e�������̏�����E/q�lU3���t��Eu����$'k'��:9�)ߜ�ImU�|��m��;��ȁ�#;���o;G�edk,�n3���v�Mkep��UW�t"�\g�D�R2.��d5�'&�qm�o��y�g}�P�e���⦎t����u�0|�Էs�ŕj�.a;��w�f�v7��[�R@���H����mY6_��E�d�U�ml�Fe��̐�u�(��p�W}�P���f�-!_�R����2�WE7��5��:��d������\p���Fg2eN��}���(��a2��]_��G�E��F�U:�y�O�T�.Y��k���X�4�7��S��dxVO���H�$%BLhQסd\��z�0�Yu��B*F3����4��#����ѦHr�<��(��H<J���S��v�YZ�s�S��l��n�^'���:��^2�%ߦTbv�/]o�A&9.�*[2�aEȧK�����2��Ɋ�{��"K��Wi|ES��&�U��t)�74cM˼�+z�DiaSa��WҦV7!���kܴS)<r����L~�������^����K�\˰�|Xs�M�y9[)D(�5�3����2J�r��@׸3��(KF�t������/��7��Z�<7jLԨ�!b�N9�d#7���w�Np\�����&�ȌJ�K��'&!5�@wΚ���M��z-awE�&�3g�n����ZnK�Ζ�]�l���'��}���7i�!9ֲO2�<���Z���:Yx�y{�,�p�r�)|6:)
JHiIO���ޜ	E�"��e�ZU_�Q��5o'�/�>ˡ2˭1�`K�)pR��zѢ�1?-��0A���`�L;�Ű.��XP��$��NP�'N��`Xqx��B��Ή�Me#]�	�Tz��b�
��=���KPTqS�Ȍ�1{ �#7L_sq�0��5�
 0+�4�+%r��p�S1R��xK�����W>���G��Ղs��%n�0�A2uaN��d�n��4/o�����#0�Yd2�L���.�ynhv�U�(`Ҡ��A���X`����pώ�B�U���Zg���Sn߾UwJ�V����$����b���]�lH����* /�3[�9��9���a8G<��1�-��-�p����;!���    ��v��R�_+�N�)H��t���?�h���cV���D�e����Q�)OV2ojUc�|'�T���Te��׬nlPņ��H��"�I��)�
�SKb��H�0����j����)FD�*��k�<��eK=�m�
]�FK�#�L�b��E[�J�
gI�&3W�����?�zE#�t]�6	�8kZ@U�M��;�WL��u"��xnǇ�#DN$�bj^B�2dvjn�Me�Lq]Tap��қ4�Wc�kb4���h�e�sz-��gdx���n�h��i�ٱ��J�4���hj��ؚ��dc�$o[�V�YK`UC�Bľ��}��ۆ�l��Ez�Htc�J`^�9���Y���٩��T�4�=5�ҡ���m�L��8>i�m�&���U��S#xe3SP��� ��[B0�P$Hgl�gY$I�@6fs��l�s�Z�b[b�.�e;s�����q_���m���&Ө8�o�{��Ok��h��7$��t�w��lݟ6|dǭ�Ai� ���@r���I�� ${��mi�!9�Q���h_��6kw��\Ʊ���_o�/����tw��C�b��ً|��;�wѝx����1I�4��6�u�t�TW&v��ĔX�~G�.�-ʄ��� Vb~!PD�o�0�8� ��mp8"[L ��ua�y�E� �ֳ!�-�6�7�Q��Q�!���5W�!�8'�6&������k��{{�&��֬y(qNQ�C�����򃽽�Em�U��4�3J=A�UdmkZ�$��̮éu�Ą���H	�����Ռ׍��\$�����vL�E}^�f�툍r݇�"]�[��&���aFz�ޅ��X��{&�����{�Mj�3�9\\�Q��Y�Yem\ᝌ�yX����]�ˡ-`� Q WQgԒ�Rb]0�Z�͑�K.^�z�,Rdw_���sSnd׶�"�ƌ��"���L�ϣL�\1�1̥��nS�$Zmˁ�-�6���^�\��n��h4���dH�-���U�o�p0,����0���s�d]2靊4���X	� �q��kpÀ�A�E�&�]S�J��/�|��^��D�����^\f�xi+���
������m�{��\�����:8%a*�Gfo� 0����^�R?�����;��*c�i�;<^��Q�[3����ޕ�샣`���F!��K��Yx�p�)����}�,:�1"���DK�r�e�W�l���o��I^�M*�Q�2�(�R(��G�Fr&W��RG��ǧ��rQԯm��
`�fVn�{�
��gK�3�O��y�(�"�@j�ow����h1��*��V`@H�x���\M�z/���j&���<(Gmz��	hf ���5	�C����n��I�:����6�ɩe��` �M���v�ɂD��2a�,�r�k�����|��7M6�	�Xmd2�'ўs�5�,�]��S�=�9�`��b[I���ሡ<wQ:�0�����0'��.�?0
)���*_��mut�ԯL������Q"a�@vN��	yb�%����q*���\�)�G��lI���iV̇���A4�$/s��p��̪\�L�նΖ��:�]@^�9ϣ&w6�cz�Oh	�a�l0�1��ZWM]`��mnbe�2V�k��>M&Wс�:C�=V
A� 6LgF����n�U�Ӟeps����S��@�V�{n���D�w�{p:�nn�mЮ7˼Y��2o�y�̛e�,�f�7˼Yv�f��NK"m���O��ݘ��-c����A����{3#Xd� ���vt-���=��F�*x��<�>C��>������Ftp�H9pm�F��_ղ�[��f/[��z�H��v��uH�����OފOD������������Ko�vU���ߤi�;?o��6	�9R����7�O�G�y���u���������(��W�^|�E<��9An��\��ܰ������p���f���u�^;���U�a�b'_�X%g�͊xt��e�`�z��Z���}��1;�X@(N�uiU�Ο�
NS�H�0�_~���!^���9p��G_�w�6|�_|�u������������&1�����_�Kx�d3�
}����Ǵ�`�?�J'�G��#���>�����$�x����7/�5�9�������U�X�D�"�*?�{E�����m����l6��D�+�O�+�����Aw���&��ɤ?��P��{ބ���e\��l9���!��F�+Ç~�mxIgTN}�Oeg��!;r\�9/��x�xO;�N/#m��H�?n����q�3�n�t��k^�-u��-\Z��.A�����<C� �F�@�z4��,W���q-�Ja����j��I����yT(n��6�.�-�ۚ�n���,N�/��&Dwk���=ǒo�MA�W.���og�x���]�
����S��au|f*:���j�;����ʸ���]��*灎��j��G`��P���D��f������9r��g�ޑ8��Z����3�'��'	|�\�[?y��o�B']oҜ뛳�^�2��x;q%/ʏ��PB{N����Ų�U2��C�������]ԃ����(���,i;m��mOflB9"+�N�erڷ.�s��-���=ʙ�%dA7bJjm�����O�;u���f��n�|N�o9'�A������a�k*�]����f����$���:P��F�����-e�OH����	��c�N�I;�ߝ��>�:v�m6����^|�&>��Á��F��ק�p�d��E�VH��(1v��x�K,xf��4
��l$�>�d�!٨�[k��l��-;Gc$&��U�NSo�J�E�M��$��r��PJ�N5�vm/��L����w�x:ڕ��n�m6���X:Y���%�
y��v���F*�Z��d���l7$����n��n��UQp�E�������M��+�A�!&��j����g|"å�g*G�N���u@<�&LV*?Z�5~,�in6�(i��g`e� ��(o�zjܕ��.jm6�M\�X�<�-L$G -g��T�"We��1��k*U�7��<�s��+�=�����]���iע1n����|Oc������R���>�����{>�4/������
��<�9��%f��|�H���ZG�U��d�/�&�:�8t-q�����.t4췌���F��+PAV�8���O<�yۑ�FV�Yߕ	bp��H�l'$#+n�l����e�C�{����Sw��t��h':5����l$z$�H����jm6�y��#�nHv�(�^k����+;풥�,m����{����N46"�ݦ1i���ğv��i�Ġ�l����fx�Pj�����ِ��j�RO���m����u��P�s�^�-�-��QN���-E�j���8����.�3�k&%���
ڗ�� K�REU�[J`/�+�%�@V�G�r�����5͊��Q�&n��S����Vm6Lw3g��l�rVm6$;�(L��'i�a�o�߯d�}<:������^��A�s)�g��d'���O��o�Q6�}���tPp��+��_��F��P��&%j�܍�7椓֝Y�M�a���{4<���Z�l��i���Og��;�d����]g��a|��'��Q��f�N���'�?r�7O�i�WwSIm�;�l$���>��7�ӻ"����&I�V�Id�eh#MlUDW\��I�L��!wT����u��#�@2j�#)|H뽾�>Zʷ���Q�;\rϱd�I���+
��(�	i!��ٻ��zEa'E��׶��F��WF.+u��������v%�~�Y"m�[����H�3�M�m6�}�٥d9��M;rV�v��TOG��Ѡ}%m6�q�{/�kx�/�49B������R��������art�J��9��î?c�t�+��Ƒzv؅��	��q:;�Og�]oF{rؕ�����v���P�M�P^֑��:쏾.C��{�K�U��&���y�n�ht�;v�YH��������-�+�ٻ�3�uw�w�N�Z������A�y-�ѯ�l$|u:Pw|��:����
�� Ƕ�*    m��|������<z�V����&��qaw���4�r� 0���uڈ�PYQ���*+�B����	 bG��&�Ѽ��-��lI��l�*�nh]�p!����'ȭ�$*R�Qϙ��`Z��8�ˈ=w���>�l�N���z�.�p�x�����Gǔ�����"��4�Ҧ�����7�ՠ��XM����y8B��`�J팒��XD�w�"�/�Wm6r��!�-�z'���U��;�;��;��VJ�����-���N�!T�-���vH{o�}����֭���.}A0�u���'R	�H5��0<�M4Y���u;b+9��V���
��0*�����+ZdkM�^+F�j���{?c,�{��D;	"B�fDE�f#��������6{�>}�'��H�u+�j����w�w)K�]��6{w|��g�����{�f#��s�1���r����cW�X*(�YH6�l0�G�>r�����?�\9X�+6v�gϺvc]�Vf���F��x�M�c���MG>p�޹\�Hs�fu��n\��gyɸ�F����NZ�4�6{�>`�p��%fO����8��r�r���\,��3�������6k	��~n���f�s�'>�Z~n�w�g���zWn=t�C�N:��L zV��u�>xfu��j�؝��;㑏Ž��s��i�l�i��gxQ��(uO�g��d�o6��J�B�6P>��%�D�
��6{w| �畻�J+ZJ�l$sf���륶,�f/�p���v<H�}mc���z�m�$�6�z�c5��Y����7�=����4�����P�7�.Ԁ���վ"o:Y�博���8 w��9M'�U�6uIjh(��6�sNMĒI�c7M-����m���٠�{��I��ѕ�x4�����#�����Ѓ�O�v��6uk��������6�c�?y:i�IzN7��ǒܻ�г�;H��;>��	�	�P� ���]G]�����f\���vm�a�$K�4��L�H�P�w���2��<�M��A8[F�
��x���1mE��hM+�N�Voz@,qSfyh�7kB�@]^F�uתX��9��狴 T#I@�]���ZF�X9��AHc��u����\���<�1�5a|�.U��E��no/V���qgo/�Y���ʼ8���7�I����7�wp)�h
�P�w��kE�_%�\ɋrѠ�iϯ���Z�,ib��p��46�"����4��%}Zm�E�oT��X/���2%��������q���;E#\�x��'��������V�9���G�V�u�U��� ��{�=�='�¯��i�utY�7�u��y4���
nCJb%�����N����)�λh��Bډ�ku��<#��1)�Xa���M���^X�"QJa�,׈/J��ro׮����鮃t6#���A��OӾ� ~6T�X�@A� �s�5����<��R�-��Ҧ��ΰE�M4���52�ee��_�Tn�;��*�5�'J�i��ܸ�D�/�/",��2�qzM���N��h�%�H1�	�y��I��p~���Mo1���z�5t�$r,��s���z@s��{d��,�"����-^�R���8h��`�6��P O� L%��Xf����7��������K���I�F�(Q���pA�4[��)�;��-�D�S��"�.��a\��E��^,���*��@�0�8E�+�	iK��$��u�� -3���"�e�vZ(�3�#��T�3�� wLT0[��"�S#pa��A�����j���k⎺G���vkM�T�.dM�i��ӡ��4���k�!����=��4��כ��2��x����ږ+�X�R���PX^��g�~�W(�P΂�,'��!���`V�D��<�V��q B���(܌E�T�I>�<
�#dsa	�e��͛	nҶ���W� �n} R��$GjÈ�X�n�xGZQ%*_a�J&�r.��&���O>MQ��4��"���'����`��8'=����-׀g^��Q�
�^�i�3M���n-�ibQ��a�u�ar��
�dJ�O�B�C0������G�rc�<������"���0��#��:��Iy#d���7�W��y�6X��`�-}C2�(4������t�qK��K֢i"Æ���1�V~�X��,QR�UJ���~U`@��P�E��S5���c0��pE�}�8	��`����d@���X�$�baO�"��0������BbG�I�)�Dz���,�G��fYxY�x�2�`��[��+,�|�� �`R�2�A���͢��M���Z	� B!A0��Fw�6���A$�RVP*�c�Yח��4��4L���B`]j*�A� H�8]@F��b�?�>4�j!�i2۲�j���.U���61�QcL��	���J�%�|6���<!�~x�sR=��f,����L0�A`��a,[��5	���%��51�p�e�a��_�@�Σ�PK�lڂ�.�jK��eʼJPG�4��Vɨ��jv�R����M~���=�$�!�+Z==x��}�����
�0j4U�J�&5��O���&�Ǣ?��l���vT�X�m�[Nf����w��w�vB*Oް�BT�kM��!B`݈>J��5�����9���%��e&�FG0���=�c���д�"n3��h|55�S�X-����`\4'ŊS<����s�`��1��RpSa_L:,5��M~��'�`���zީC&"����\��)f��b
�%v��Iۭ�'��Y3p�ˇ��SZl\�MSV�Ȫ�om4��&����AۄY�A��!YNxˀ1֛���}��j~�DH�ơ���[�T��L|��3�w�O7��/�HK�ך�|�n��� x�܀��وt���&��j]����%:�b=�W'K��M�%�m���m�m�~�c��f8�}�h��N�f��'G�N�]��V�Ji��L�9?#�ئ�7�d2��Vț>�3�H)k"N��"��+��b����!�Y�a��^���[}�S�w�T�G_��-1�w��={��u'��wĢ�����c!�j&��B۸R|àY���>6����~���A����D���VR���^��}m���&_/�D�����;�m�o;�������p�@��3���+V!4���ʊ�S��}�t2r����W�?�%��ЩY<�{R߉ԇ�kNC�5�c����C����%Cgْ�ݒ��^D-��~n��γ�����J�z��"ъ��3��_c�X������h;����;�w"m�ir��Q�����c����g�mr<���&Iz��4+J.�x�=̢�����̲��)�z������?{��7~��r���=q�⎡1r��ȅW�ݠ���ʎ.:�ˏ'��f���;9��''cU������c�`�w{�wo� �/�w�{����^��mj/�Z�Ϸ��-ϠV����7g/$T�
��S?#&�*�Ȫ\�H�ϡ���<���QDc�>�M/�E�8`�Nu$��C�����g�����I��|�{é�>�x��L�z����3��K�D9��N�x]�̜�M������	�E�UG��|��V����$p#��$5�vq.�}(�i+������B�(@ w��Tm��1���ș������2�3�Ug��M�$�_�l�O7��9p�c���8��}9��*�� ��p��[�g;�v; �26�_�AUt!�B�'D�{{:��Gȃ�ĸ��Քp�51S�`
F�mx�vO�������aY=ڴg!K�� j!ARǚ��[���k��ȝV}�|�N�0r&}�t�Fk{�F.�޸�e�k>��]ʨ�f�[�6tk#�П6wS���$�k�f�rE�ny��Uq�!x�\?yѠ�-"�3��uV�79��I}��0�c ��� P���l����d)�%`���,�$"������T?�s���D@I�5�,�2Ax�6���0�� ��8��~��{|�y�]~���! Ќ����h,����VJ�"    N�U��Y�y
1.�W�e���6i�m��O_�| ��B�Y��1Q�ۘ$����"F8�9B�,�8����pC2���,��u�G�ѫ�B3���#\!�[�%T�,X����W��i��M���"���s�k��h��h�_G"�6o�p�%�V���x֔��!B��1SBl�XVZkz��\�X�,Т�@�qK��a�_�@�J(I�%�Nv����q���cg����PCo��l;�G���k��Ȓ�ğ$J� i@�I�
zd4�&	�9q;���:p���������^h1}��]>7��bŽMAη��$Ɋ��I���
�Eu�@��Q� d��p`k
��٥j�8�����QJ�S�2�=�*�e�?�}��0��ǙԴ8�C�,�UɄ�$�������gO����	���a�'�Zτ��7�^��$�C�Kl��g�ݖ�8�t�W���^AN����XA�-˲8��k�n@h�������_⏘���r~�?�̪>UQ�)���Z1cI���<gVf�-YeQ�R����7"n�<���ϋ'��Z��?Ur�ߚ����eoI,�õ��Eɥ%w�&�h�:V~���k~�u��s&eޡj���=}�F�b�kB����B�%`bp�Y#z�,!|��Kf����GC�8�N��������?>8-��3�gl��Np-�<��+�~���{�i�!~���ómB�)<�Y�%j��W;Η~�!+R$���ه��p���k?h�xF{\�z�T�����m�`E��W�
T�CcZ��?�|�y�$���u�%1��R����kT����$$�cU��S�#���%��
?)���w�Yn�7�ȄkU�$��T62P9�s;,+2x̞���y��pG_��d�1��'VW$��ue���Q��T�� ��$�P�,h�{?[�E:�p~����ZC)�84K����'ώ�N�b`xI���)���H����oܸEB�L;k�1�ǖ ��$�ܵ!sy�l3��$j�ݲj�W�"(a¥�YA$E��e�I���׳%KХ�J�9y	�<���U#�qO�������Rx�%x��dM��j�&Y�Zu�GY�s� ��Mq�a�;��� z�n���$�ڦV��C����M^�?�<9���B��~�6g�y�j� k/\þF��:x�R���Q᩷��^�����+XZ̑�6:V�v�6��)��I�A޵�#=������P�vz�\�	k7~V�?t%ǿ���\oM��;ގ���7�Ϗ�XE}�KKE���q���]J�U�G"��Ĳ6�z)ݔ�qU�D�qr�M����={?媕���Q|@
�o���?�S�O]����3���T��􊩌�	��\[�wh����q
u^9Ax�c��]�%\���� �3;V�1�P�B�^ 34�ܟ����N��|�(#h�a�!��_<�y�p�bTs8m��[}���Ilr���W%���l�C��#��i�U����'*����s��Wo��&_\c�k�Ƅ���wi�s��_�h�g�����$p���0��y`+�j����#�v�{8�(x�
�}C/oa{��x���2�=C�(
�Fz���yZFe.}�� ��0+��O��A����D�S�h͒ "�om�8�6��~�_A�LCmb	�Nl�ө2uTg������*`E�����ϥ_Ibp�:PҤrց�D�<[��1�&�y�r�-��D8rQ�S��UO&]�^������T �I����e�N���{$網� J�E��m��&�~�qӁ�,��]WY�f��E(]Ztg�@�g'7�\Їz�3��V܄��Huh�+eɒ�k��f:X�̛0�<��M���W��ەܛ#/�U}k}�𖃟�eIPaӨZ�*��V�	a��do������R��c�;I�Tu�PGAt-<,�N�^��
��k����%�9�8J����b�UÜE ���d@�1!�Q��N�h����B4��5��zz^���W񟞗��f�}&�s*z`�d�R�G�hW@M��+OYDó��Z�� � �r!��[^w>X���% ���:\6����K��T�k�{Ң�����Z[.�_�rlM�f�(�6���:�7�$^�%��� �7��n����X���;�:#��@���1z��Lv��r��J�,Iԝ�4G��,������ӳ��:f���5��jAmj3!��$h�$�u&�O�爅 �;9�U�B��}hT+��5S�{��_�ޜK�%G�a��,�-�<�6,��T��;�6la�R��Bk�B�U�k}�D�3�>��I��zS��J�3J�~��X��3iF�#�F�mؚ�S�IT���iHl(�����R�J&o�](}�6��m��]� ��_�J<��9��<!�]�r3�5�0q�Q+�J�'Ҧ˲L1��FNcb���EP���r�9L��'���Ą�����H�1L�#YpbM�,*��}����ʬ��w�}!�H"�(��	_����ս?XO�n�'4u�4��=Q\���ES��ݨ2�	mz�F�^Yx`T�������}E��Lb;��U��Ѥ��$Jʕ�4�V~J���m����\|��;���7��8�n�+����篏��G���>N��i@���?���<����~���ӄ��o>�8���7��?�8=��	��|�N���ҟ<�0��Y�����3R����#��g�ĸ5��b�mߓNX���8�1Dܐ�e��v�������,T|Hlx,�|��m���ƶy����%�>t���bά��|�-,"�(sP7�\"tl$G-�ؗRG����4�Bo�\u�C�u�K�%���t��KR�ک���<��P7��]��@y���I�?�vi�c�!9�o~_�)���N���L+��(��20��L�VF���GMۧ�*�F��^m��3�SJ�b_�1v�����w~FBA�-��O��{�JL�P�vdU/=��B�PU�<�
����I���"�X�{������D:F�'Zub�[���O]z���ܥ;9g�bGۀO��u���D[�1��e���U�N8ϵ����F7��-w������o�'@{�����7����-�
s�ӛ�gэ�pp�¨��!�?*��+��M�nH��4�կV�����ة{#Uw]�v�W���	���Vy	��+�SK�Nru����C�pS3¾���Y�_���%z[5\�Wto;�@M��>@2c��s��qPp�Y	Xv��!���$9��9��qy����H7�1��<U	b-���<x��l����z�*�3�~ة�\�_�t��%��6fV��A�(b#ŉ���g���؊�[��rS����k�R#/��ڝo�M��T�F�mԙ���의ӓ��1�*M��[�Y�mjG�i�A(r�ިo��T�*{NE�Tp���%�- ��(�� �=�Լ���z_�ܝc~��ۨ�ݡ���ݩ%�pj9��R�o�ҽ�_��'��A��[��_1ψ��3���y���.񨖍�"�J,J��oq�
�h�:��VẌ<�Qi+��h8��Nu�^�$b�n�P��;�S݅WaJn�`���0��zD� ��@�̭��}����4_ҍ�9N-���92i�#��M���%8��;d���������0���E9`,E�B
��6�&W,�pb#���Y8*�&&=���:� T�["�	3�|�!Mv����K���"z��g@ќ7��d�ETb�;9�o)��[�z�Dw�;\��-��;�#bo0�����G�����4[�Cs�QR�H~�8���-�������,��tj�[}2��
��Rn۾�}�%}�s�(%ū���x���|};R�poN2Ap�R*X�WE�ȏ�P������߇[�����"/��`�[����?cu2����p�	׀��ӛ h�n}����H:�)��C�a���m�P��C�q!܁�|a����h�c�� �w���%���-(1Ɉ1��c��J�_Gw�m�����DV@Tf��xk[�*.�$�Y±"[���]n��z��    �=
0�i���2���.�5�D	�Ok���0�OȊ�@:�Ồ�}t�>xP�*E�v�o�ރ��~ �/�"��	��O��(Wh�β�V�A�)�� M*��Hh]�5'I� ��W�摜���YOFa��gޛrU��-t����H�*S�ӞZ�ZO͠�0	�	����⮝ҧ���i�5Nc��E`��0G�	BZ"����jy4{�6w3�'ܰ�'�]*JA�h���x�}�G�c��w5�#z&�"���g�g��E"C���0�dUO�͂N&?f�M {ސ�׬��kH�-?��8e%�b�5��Et�\�;%"KPWH��Ut����c������>}�ϑ@�V����!�������L���b��Wp�˲J�W�j�I����� �@��"LZ��l��Vȓ.�P��H#��ܽ�lr䀤��������iU,��#��ۃj
�̉'�m6��l��+�͖�6��C@�sEhYm鬁��|�n�|�P/�}�s�Ot��b8���vm^=���Ax�P��Z��6@3B0�s(���7�7����z�O��/�67{`Om=�'���١�wh9�t�q�'�ZZPOm-�'��t?�t���:HN�F<o�Y�H04�	Ǎ���N347���&��/
=fmj��M�G{�V��Ϝ8�=�����,��_�JR=��չ����������O��;�7I���[Ͻ�=gށ��=�����_'�E�.�������y�~�o����z��=�g��"�mQD�ž�����.�������4���m�n<v,��;��8��ں�N��/�C̖�S[K���A�'��x|���P7�>��f���7�����xf3������������e�����P�w􀇺���}���W��@�V�~�4��?�LΫ\��~�m�SY�a`��DUnX��)nv^�����һ��S��z��ܧ��Ͷ�D2`g����-���H�qu/���U�~�t#�.
Z_�d�\�*��g�/!<?��՘wb���H�*t�P"�n�u
2o d'?� �δ����%5p`KC����a�/�)��{%��r�B��!+\��T���du����p�b����+����V���,�O��P��"J�q��{v�厁�UWr�7���>�<��-���z�:�g2�	)�=�ehX�<f�e�$��dN��=,�����we߁�wf�Z4��,��)dK!�x:<�m4�������7Gj�Z�|SF����^$�@Ȝg=ω\�I�l����;ȳ̩&N�8aB�a^�;�]�;H,�}�$�������p�X�B��PQ��6���_тNy��8
�.��d�F�Ga�䆓Nn�=,���H����ǋ�����((/���\��������ZB��_[����^��܈��ly��a�	'@� !�0�;�l�&C)4��&=>ğr�n��u"�� ���H��1�eFU � ��騳���]���@�λ�u��F3ry��N�S!��l��?p�Z;:۰+����E���͊�ܴ/�(=PW�n��zR:��Z�s��2�F���n�,��mk�[��*ЍD���8}4]��	='��=,����*L�vO��;�'����Y�H�1c����_��U����j�n������7k|��ϼ$�o��oH[�z}z�D�7;��#l4�&"�����؅���u��`�־��־�pn;Z29�R@�AyY�_��H�ބ��mG�#�u|���a��έ����b��U9�����tB�k���FR��;p�\���=,zҖ�>j�rM-�э1���E ��*HZ�M�JL���e)l���Nh6^�<�5�T>�.�BDk�	���۱W;��]�~�|M�Go]"�|�c�/���s��C�D���~h��Yt��?[$�pEKj<�x����r�~CԵ;�����j���y^��.�7��p�ߖ�d�����{i����u��t��C�k�!sQ�壭�J��n��A�Eٲӛ�MPp����?�P���f����Ze ��=)N��wr���ׯw_�0�O_�c<�H�3i�E��z��Ճ���:f��D��� j�. �X�>��7	:�A��S�j@/_&�U(=h�777'y������-�Z��-�谓NJ�=C��2�veËQ�6.��j�K�r�fx1u�(�N*`J�J-4=��e�k)��"��n�|4�g�����w[��h�T�SNE�|}l3��e�8�!�[����ȴn(�F�N�ͷu�$?��d(��4
$�G������}N,��r��d<r���'��6[2�xl�������l��8�r�W�+\�x�����=/%� ���c�^��M�����]"���r���#~{|2�������'h������>��.F�x���y9q��	6'؈=��3�v��~ ���l�B�w�웳��ͬc���U���01:��L����7AN�"W�9q�:�[0"�������Cǀ}lU��Oo��-zj�����VuY�E�{��q�i��7�hJ��qb<�6����I�
dl�����p�r�"��R���B��f�y����/��>�����E ��L/��9�|c;�e4�9��=65�jN�O����.>ͧ�y�~&T|�ckd�P��xU�W,��E��<Y��c<tV��
�=F�1�e&������q4j�� /*N'u@����
��@�r�7Ԇ�P������K�<���_O��I�z$��G+������g����Z)Z�����"[����uW��љ������8v�u�r�L7��t�z����N�E�ujX��WݢP�"v��#�4<C�.� {F���|��]�	�T.���=mYӣY6�v�i��M��:��Ua[�m�	|�
jy�L#��b��r2��M��dq&��l0���D�.A%��i�����Ľi[�Q	���wM�O�NR�s�k'����f�okb�N�j� 8���R}s�\�D�/w#1M?-��M9K�^�#(ŵ ��(��[uG��Koi��Oѐ��ӳ��:f��~�:!���i�g�3���;0G�I�x}Kn�k�]8_��0�-�y~�r����';^(�U�1���br*�B�Z��*r�'��U]O�K��0�[�L,���Z'
�(�v{f�1�ȠW��œ��e��'����x�\���K�K=���=��F[y=fn����܏Ofݫ���Id�= CtV-э1Ș��Ӿ;�x�s���l�5�d����]E��Ժ����t�.���g��٠|�1�eF�C�����`t�Ԣ�{������A���"�k�˘���"q�!��f���;u�eN�9e��a�ck[��S'�>{�g�ɘ�L�L��N�{ӈ3�#ũ�!��[�D��I�E���]������&�V�1y���+N��+6��_8bT�ZG	���%�z�Eɒ�E����E�9�q�*�C|�ޒ<�d���j�\Y��/�9�����f��$#���i��Q@��:��t��Cޛ�����L��] �=���W��1��~�:���q@hkS��U!*?���'Pn�A�%���W��P�M7>��#�(͙I�c���8���m��@�A|f	�E��U��rl�%)�Ј����I���h����'�O���l|z6Z�L�dw��{O>����&:�1��&_R�f�ӹu�ܽ;�w,v_k�ec&�M?���j��`9y?���w��e�vT5f��3b���?����s��6����^�1;�;�w��]�a��[c�$��_.϶���:fnq��CJ9T���&�1;.@���r����1��&�T�'I�ľ���ɉs���>��'���wD�u���Psn��۵9x�6X��:�F���-'�m�T�\��/���)�,7��tֿ0E�h_�U�8Y�L�Nh'h'�8��F���OXき��u,�1s�sG��Ԯo)��[�6�p�>�$ Z�!x�\����%�S�	Z����ញ��S���|]    �#��C�n�������|�k�RB۵����:��wS�aL�.���8��~NӴ�Ϡ1f��/����OK��)_�y�y��*pG�`��r:��6�؛#��9r]h�����Y��%��t���Du3+�K:�������5%V�ڄ�~_���M>r�=��xl3wϦ�n�bp<���k�|���XB�tH�P��O^��Y:����_$�,����t�V�r��r��z�7�L"S�}�Tu�@��m�m�T9׭��HWŸ �Y�D��������Y��h�N�K5f�`�W*n@ا��������\,u7�5<�kk���[�8����F��/�J�(�%8�w_�g����
�OǓ/�цa3�	���U�-�bh�/�#%�l�<�\���B��b���l��O��p�y���һ��3Ø3ks����\���r��92��[p76��3_w��K|gb��L�.���S��gÄ�1;���⿏����]�)c&�ݯy�#2Gd�4�1�ȸ����a�]7N�L��}`]Lt+d�Ď��'`�8�1;εs��s�=�΃��,3v,�XƱ����
�Z]!չ�� h��G3��jY��z?GՒd3�'ٸ��,����D��ع_��W�hXC���c&$������dE=f`G���l�^įP��� T�dr\r��[RI�����y�37��b)�;��v?��:gu�����[�L"}Y}�e��7=f��%5;�/�u���Id�ϥ���qܷ�u�=�ֳ�8�;�������6�h�A6��о7�{�
\)�}�'	1�:���'�1y.��$�}%��b��Χ�ӿ`�W���"Ll�nSW3���|4Y�L"s����gIs��ؑ1;3��Yz��1C�G,�o� ��+��r�����a���DI��f�u�<�����yG��1`0t=,3��,Q"C�L� ��K��K ��(c&�}yA��Ќ2˘�{W���p�mF��L�ܯ��k9��:[���*�j 9��1�SwS�G��0C'v3����ΥO՘	�y�:e��S���\q�_��ѭ�Ȅ��%����<�fA^FE��@��{����JZxq��d	��a�s�e��M�D� �-�Y����r�0M)ML����'��{\��5�?�+�L/�hVy��L�e�7j|����i)�k�ɲ%&%+l��}ϱG��&}�6�����k͉]i�i�V®}�9>�/�+�(L(�^���n�'���4�Ks�ݝ����31,�R~DX�/).�GӤ f%*Ӑ�E�9�|�W-ӂZ��Wa���2)�����"/Nnbd}�X�Ѓ�e��(x�-�� \ǘ�.�5�2��_�v�����6���1M�3��e�:h`��]gɍ@�:��i&C���Rϓe(�P��.�Nʜ�Pd���p���(ګRK��I�Ca�֍ֽJ4󗋌D�-V�9���Db@vAb2PA��	�苀`a������D!s��7A��4�կV�����D� ��ME>�wɤ��� eZ=��@J���bC��/�ZA4?�����!��@��o��O�m��yRfK\5���ۯ�ݸ1�\�8�
2zEtR�(P���⬁^�\sq7I��n6$��ڐ���=K�A7�B��=�_��F�ͻ��1���V�q�$1F�>�tH�+���$���&5�E��I�eH?�" ��dʌz��_�ޜG�Y�W%�l_FWyËm���w�g+p7�F��/ږ�H�M����FqBB�(�bY�RB�OR'!rN}Ziϻ!x�GXE�eN�y�x«m��72#��2�ѼG�,���Ayf!�Y�\�I
F>A�Β��m�Q$�G֙��?dp�Z�+)��yM
�`�����JAXٖI�]����0��^%HE��%��� � X����'�O"BI�.���Nɫ�v$-���,��&��������J�wH�_��P�
2H/BȎ��q+�xE���| $�����8 U��Nz#��@�4��+r���=9���/6M̳�$�	����9����Q�Wn*��,<R,��J�X.a1�ydZ�z�2ﱿ�~��fy�<��~���u `QF�
��6�.%��	t��L������6,�&���r��~Y��vD�%�^�;�w�O��d5A�zP��a�V"�JL��<�.7�$S��Ui�U�&74�2�
�P��u/����T�X�$(���-7��Vx�b��YH1�&Lslt�D+8��
Z>��]	�A˼���ɵ�Q�[~�%AeAܱ��
|�+����!8�ײO�R�5{?^����Y�} m�m -�ź�[X��
��k��6r�3�&��p�/��q[��DAŀ�L�)ْ&9=)ZS��~ D����.�i�e� �L�"��}&����=0U�޲\�G�hW@MC����E�w�A\�p��Y�Vg�#�~$t��x�0_���>��v�u(�R8�9!'�Җ6�ZG%z%(�k͵6�F��F@�	e�g\f:B߀'pL*lWQA�[��g|���l	��ـ�)S:f�	F�����R��^�]�LibI�9-��W�j;���Ƙ).]����ף���1;�O�;�����k1ɘId�_���hؽ�G���wuy. -��==wa��ҹQ:����|�9tR�W�̧����2���~��M�L��@�=�0���������&��XwCӾ�z�����z̄�{⣣^?d�����{����.��_��{��0�<�0�?/��.�7�a���՟��7�����P~�g{���KS�i�~)S_]�Ά�R`3!)���:N������_ޓoϟ� ��x����ُϾu���oĞ|����������W?�uF5���[p��C[�q��=fbg�W�f��}�c�f��S�k��շ]q�ىu�d�v�a�7c����ǌ�~�v���b����A��i����']|��9扎��c&����J�1
:��c&vf_Jٗlqf3Mo	+ʺ����'#�#F��vh)%�A.o����v�;$�h�b]�,@Y�o���O�s�S� 
S{wY�'�?���ԝ�0#3ɧ��d)�D)����e5��$S�41�p��2@����8�Cb[c�)�� vD�HW���=b��+�w��i�G=D��pf�*[����R[�j�ȫUH���;�V�C/��
6�I�đ�IF["&�+�-@X� |�$��c�/�W:��>����'�/��S��1��!>I��J�`�;��Yc!,e.�w>
�7e����W�	��>��f+|�a��Ŗ�2�&� !�s�g���������,��tj�[}Z��
��`���V,H9�py�(%ū|Z���d"�)�8�@;//�� d��si�ի"��GL����.��ʂ[��-�����\9ҋ�mL3�C���g�N�91�e�܄k��؉��.���V����_1�i��!a�! ��l���ㇸ�B��m����DT�E�,��v�y!DK��ڠ�$#Jĸ�r�|�U�:�8���y�Kd
De�錷�����K0	c�p�Ȗ�����qЮg���ѣ spP��įe5�݄�І���� c�i�;>#k����+�t�	�w%m���;|�U��$"��?���͋�?�싗�Q�}�xiQ�|�,�*Z����Р	>�I%5�`J�kN����7��GrfW|�g������yo�5�]?n��\����ʔa������S3h%L�\]X���Mr����ǧ5� @�؁�!Rrպ���@��G���ms7�z��p"R��Y	h� 5�m!fˎ����w5�#z&�"���g�g��E"C���0�dUO��B�'$��,�	d��������|	��'u3Y	�Xc�ܛ�讹wJD����`٫��F���c���9(�J"q:�0����1��d95���B֦ȲJ��x��8��&�C�7?L�l&��1��;"��ց`N�l�<	�
����İG,Ȭ,�I��w����%��qZ    ˡc�F��	�� �˜x�\����GVh!�-}m����\�Ӳ��Y���0�-�ϴi	�꼗D>��e.0��Ge�e�UT®ͫ���<��4_k�����lX���	⣽�9�'g�nb������/)���Y�����򛝛�+2flv�w����L����z����K�y������ۖ;�[k^��It���qL�8n���u-���9r����3>�w�jȘ���_]�����l�ug5N�d+u��d����$�'d%Z��m���X��U\��=��d�Y�:��V����@�J��5����������BDO��/p�$�r����ƞ���������x�ǯ��"�n���������A����_�z���3~\䶷i��$�u����]���[��4���m�n<v,��T&��8d�H�&�ӳ�a�I*�/H��c��̓2�ԞXV'���}�Փ��_yg�.!P��W����_�!<����|����H�|��Ï�!<O���?N��i���/�|�q<��I�������<=%|�N�����O>�'x�>����􌜚������C{%����Z����#�O"���Аl<f���#�O$6S���jԥ��I�똁����_���R���3I�]��y}#��P���q����/�`���c&ˈeb�n��_���S��#ܲ�o�Qw&Ui*A����f>����	We���R�|S���	D"���oIM"�I�H�#L���;�e$i"��,�yY��R�#�A�SMq�Ɇg�U�	[��L�9����$e��:��m=�eCo��FV�lB�e��9��"Yg:��֊�j�B݄a3�Ý�<��;=t��e�Ď+dq�,�(da�&��D6�ln
�5N�c���^�9��c��$0�����O.�$>A�fɚL�EU�uZ�w���%G˝���1ccw�� �@lӳ�{��3���;���$c���c&v�.z�'_{��cҽGL�uYf���i;��u��z�N��2y���^�fYHc���_9�Xol2����uᦇ&���l0�����2҉�-έc涧NY��i�j��3��e���[l��1s�swv����k�h6fo��2qU��^F�h3�3pާ�>�j�S��!��7ML'Cwv�՜�!�F�<�1�8\.���N�o�
fc&ˌ�|���iQ����ܓw�$w"�yo�����c��&N$8��D�»�3YFZfZ�R��w��>�u�3e}��{��&O��~��������#R���	{�>�C��ڻ�pa���K\8}�]I�j��������7�6�k����{���7��}��d�$A�=�|y72�77�LdN��s���?�vM3YF:$X�O����'�P}]G(bS|��FA����F�a�{�!c�>gb5�	���!��ӉgG��m��T[�u�ޠU��èAG[r3e�*��{����]�SՄ�nٛ(ߑ;ˍS����KM�AՓVw��+���8Un	�=a�D*�0�T��X�"cC��ǥ�*�/WN݃�N8-��{; �Ck���u�<��~�g�u�䶹SPNA95��[��9u�:}�L̬c&v\�矀�a׹��S�N]1�#�C�L�ļ?;�X����q=��L,�3���$�3�c�[���S������l|j3��.��31����_���a硱3>�wOd����a��c�r˘����< v�^z6��J]c&v�b�U��Ί}MPMǠ1f�y<����f������9�D��BPS�Idcw��Y�����+�e�<�w���������M,��/7EQ����7Ņ�۰�O�S���]�{|��"G�E�n��O��'�B5wgNH��/H]�[�Y�+q?�-��^����S��{��$^o�mO�W<r�����jg�:�~�p����qQ%q��n��R��0����#iЫ29��)S���%�'.�Mv)�#���!��m|�&���/!���xL��p�o �r�֔ZZ渐�¿"��ʅ�<���S�i�շa��Z����9	_�����e�ZE�����!y��N�[��6^e�.�_>{})�n^�Ax�˒�����9=|�RK�I&E���P��e�4�lg�O���O%��=&d�d�S�r?S��q����]58�P�7<�g�Q+��3YI���0(�5D�,���=��ܑvP���8J�D�m���;M��O2��9�dN�n�ԑ��9}(­ʸ�9EB�H���z�b��Ev��n:HU��>���A��"��0׿��5Q�j����d�!n`���H��Y;,�r���Ռ���2�
�Y�`��������+d6~`K���@TrU���f
�4;�"zR7_�]�e�,#]釢I�o���ti��
�Ki��,�t[�|�D����/x����Â�2���#�NθG��Ӵ��K�M�k�2���2gA㽾D��:�7�c抺hC�	zE����6�~^0<���U�br�仲�X��?�Oц��˫;�ٶݑ��=o�J�d�Č|��j{��^�\|�s��T$U������yO�?&.�1�����S �D!�qS���PId�sVaZ�h��k��)i��	�y��^Z����1�#މ�4�ER�,h��	BXl�{O�Qʕ�S��JK�c2��'�lM�UZ��
����ҁ�$JT� -���.���Ċ˹4�����b���ȿ��eʼ�+�9�.o�@�����.�MŽ�@���}�:�"~z�f;�H;��^��%)�
5䫔GøECO��j�^Y��c (���������bS�+b���v�b[A�QSTB[	��&u�:�_�����@���1(�m�"`5 7�V/�6K��p&�Ԑ�M�@�8q��ɩu�T�3g�|����:f�PNN+iI�(t�Pn�Ȗ��_�T�8ͽp����*w�f��MvT0l��G���>��T�)���X<�hP���0oi�z�lаQq��e�r/�/��T+J�p8��GcmĴ�ԫ�(�У�<�lk�^	�U��E�XI�|+��͍�w�R��,<)�����[�ɍ13��w2㳔�VG�Ƙ��A�����ۘ-�_=iB4{���4�)K�����'�Vs����euU�&�.������(E���+�])`Y����ۆ,`��a&QGX/������T�i�~E]SFx�yD��z���U,���`�D� ��,�eDϢ��C��r��Ny�N��c|��_<y}�oʵ��M����L���8��1���������*FC�#Z�90}m�ˬl�4�ߵ]�
w^�0'˫�P%��% ���PZ5��-d�84�5xp�� !6��?yϖ�AB�PMǗUa)eNu7��QZҲD��C6�%�u�%�6[Z̦rhi�;�E����N�oi*��������ʊjWw��
�z4/" ��J<ݻ�ԓ���e6v����(g�]�m��K��8���[Q�L�E��&��D�Ʊw�e�ޑ����f�0ۖ���i#��Li��c[�},�œ/�U����S���Emh��t�S��hhz�����%#��v�ڹ�\��7�B���oȜ���y�]���T�%+촡^�
��J�8�<�����UO�A_���6D\�	A�̛b^W Uh�0#8:�B��R��c&wmB �&yX�W�%�;@`�<�n���L#��dulva*�W�?#xW�NA���;^gGa���Kpm�/h?�#�����v��̥�|��zd��x�D��@L�FdSk�(�,d�=P��mÅ]�[��'���zX��<��E{l�성u�ܧ
��i�u���HKc� �I{�;$Q�ĪO�~2�a'�YB"DB�"|�l������iNH�Ti��Q��-��׬�9x�o>�ĂG��b��.|�E��9�}읳���B����J�c�����$� ��.%�	4�/u?J��:�L�C�=�p�09�s�iu�gʞ�l<fb|���q�UW�3�9�k���B���դ�DX�4�s�ʜ��t�oց3RH=	{C��    _h�+�O�����b��}f��S���ʵ!S�����>� ��˘	��_���
B��}]>��'�O>��FX�L"	3�к�j=��y�TLJ���	���xb���GβGYD���������^6V|�u�b�d�����!?�.�!�V9��-�':^��������iuhR�j��r�x�!�e9b��[��ʑ<�,��҈��_าg���q���Jq�_6��%�I�eħ���]"M�=�d�o(��gI�bJ&�ү��h�h�O�JT�Ѽ��7�>���b1%�p��W*ɨ9Q)������E��U�9@��U�����:2�Vᖰ���؂O�
$�
;�=6�|��%V{�穜��Z�D������|�'�KN��Cϑ�H8�3,q�����ɂ�G��v��A[8a����~�qЊK	�$����F���ܔ*g^|2T�<s�����PrKݜ<r��*D�:��SXB�W�t�����ǗG��!D�5���W��|7ܤ�WQ*���N�	��
�Ȯ$�X/�?KL��6��(Vm����q��k�h����
�g~�߼�����k��k��>aX�vy'�bU �2��-NS%zo�<V��}ۄ�3-c� �|�j̨<�1s��p���.���D���2B+~G�٢E+�WT��:ɂ:QMA2��?_I*U�7[�K	�H��yG֔q�{A�NٝC%c�J���h�l�L�����N&�_\)�#�+c�}�-��
Vg����ZƎc�ut��&z�����!39-�;�F��I�� ���Sk�˲���W�5u�:��gՇ��t�R]�r�[��:vg:U��8RA5�"����K�����u�N��م�2f�+�#�#��U(8�����*�#�-�}k�|�EJ��q����w��;����Ģ�l�a�*X�mD	�� �sA���ꠡ��ac�uH�n�L����g�cݾk7�Y_u��t��/���,)�m�Q��^���`|�;��hO84�����'�����ѓ'o^?��6r6O�%�+�����%����9{���I"�Xfe,���&�����p���r�MQ�d?��D٥f�pd+/�=���*�3��ks?�}R��W���wa�lK"$i�����>�����x��B�����ڏs�09)ƭ�'��G�H�6S�k?Z7J4�L|�lj�Ck[�Y�f�OY�����-%�M�Vd��;|�zC�"���k��f�3�h�}��0�Xʘ	��3��at/�h�)���L"�}�շck?�Y���{жE��vh3k��N�9)����"�S�Ad�/ҽ�~g�|�j�d��k��Z���,�'C�βd#�#���G��"��L<�]?�����p�<\?��������Z|�����5Nf�1��)�kʱ�Y����+�:��#d�J,�ڳ��u�p�5>���J��1�r�N����ҧ�r?�l4r��.Q�%�
�L;��՘�7þk+��ʸ�2���k+��j+#�����Z
�fC�O��SǖP����Е��ܝ���L�nd�Jh6������S:5�'���-�q8v������v-��Ҹ}6�|݌a	�X��φ������>�T�Uc&ا_1u�;M՘	���&��y���Y��Ҽ��9��"�����V�Ϡ�~ԝ���:�U�h#Z櫬�:��'r�ŶW׋ܳ�xz6X�LP\G+���u�r�\G�Ϭ���c�)ȇNg~*���B3A=v��ԃd��Z���ā�SAm8�S�<:u�������M�&"�؈l����N-�cjW3��ɵwz��N��P�3�����~6�Y�;�ݙ�Ӈ�Ӈ�N��j�$2���S��4sg$C���}v �n�0 x�ܰq�_u�1b�$s6���G��htz6�FMd�Ďsz�����AuE���Df��em�H�1s�u�v�0���ɲ��%�*��C�=jW��~F9�� �W��'���*<�;~��rL�����Eٻ�DE�&P��T��,���fk%U�/�)AR�$��p���5`�$Rd�*����R�������'i�����$���xa�R��cKy�-�,����{����s]�bv�:}`-1'�h�G�XWI��
�b*M�H����*���v��9I�����Xм'��h�~\r��Z��ۤ�6��Ӣ�%�9N�W�F��*�$[_�u��بp��Xaѣ�[t~�\�/�u����2f�>�t�/*썴`36<A���5=�����+c�J�j��*j���2fnx�)���/�)Q��]kjmv���j]0�Ā+���BI�G"������X`R��S��� �Y���*D�v�r$C��?S�{P*(2�.:A DrB�hLX�1�dE�J�N*%D2�����l\%�nI��I�K]�$�����6`o�}��b)K�*Uc��3
 9��(d���G��;���W���*M񷛇��Q'i��K}ĕ����dwu�8|��#��Vǎ�Y�&��� �f�eM�U�VU�+MN�٫t���;�����¸�� %J�~U��Psd?Ԝ|Al��4*c�χ��9� �2�8�Ct75cYrEust�~��{Fv1{�?�Q�9�� /ȧm�0m�?�a���ؒ����$G������ĵ�w���+�f����D6�BOh�C��Z��'���y���95یɘI�_j.�kx�<f �K����6��%c&�Ԧ�دE^�:5���+�at_�hl�x�$���F�D�6�ȴ�E��]]��KruI�.��%}~uI$��㡩�x�t�t槂��L(c&�Ǯ[��V꺕V<b	�X����"�O��o9�V��"�z�0<8h4�qX�P�	y��V�V�J�Ŗd�cҞ��̪����}��Y�e���UqZnˈ�r�'�+�`h�(�-y�VS׸`��� ���T51�V��=�wj��bo��V����,|���ʿw�#��uDł�k�4L�V�v���
��B7d[}:�Rq�h}�c[x+H^�ɀ
[�7Ɉ
�pN�L��|�İ��Xj�F��ө�*2,�=[۰���Ȟ��Y�d��d=�;~�$~���bɘ�i�E�\d�E�\d�E�>���̒"3���L�iا�ڬ �Y+ȦC�s�=��<26�M<f�;|�dP[��ئ�.��"{�kdof9�Y��0�SE�Y�6���M]�ٻ_don�5�1�Ⱦ�� C}ϭ}��3wk�pkaw`��y�����f�a��`���^&�[�_^XMU��f����|zL[��6���խ؈9mٛ����s��a�u"k�"�15�ӡ5�/J���"۴9$�PQa4�Ҿ9G�iI�_,������~���[�W���U�]]��/Yb�Bw^���ǋ�-�*�!F��E��j��br����/�b����:P�+����x�/`�6GT,{;i\���(��o���نO���R���R�[���7�
��'"��i�`��=��ڄښ�>���f��B�Ț�.P���G)׏�?��KQU󛭾o�!����܀���/%�,��M���kڋ�j��Vo���	�\�+'T߀�_��Я0
З	����OH<����0n�Ď�-'z��Z�r���IL�٠>Zk�Y�׎��-�E��[�Z�H?�U�;Z��l�M�oN�&�\z8��m6)����������7� ��[����.B�r��(Ķ�͸������g|���E)�m�_Ȣo�ҨP{Q�>�J�)��T7�g��U4_� �>��X��C*2cF��Z�dR����7o��,�=$��2�p4�{���ഖ�S-IP\��;W����i���vvܶ�����J�h�p<��WSCs�#a������t4{���M%ҬW���q���<�E���� m}O��kQV�%������=����q_�hM���RI�"�E�8x�x�s�C�hvٌ�U:��$��Y'�h�:3�3e��
���&�������杄��M�)G�;@1)+>u4Ϳ��#�����u�a1/!�T�t��JR1���`]��$[!�hj̵��    >�s,�Lz�ތ�L3�U{CC��60���.dwߐ��(�1�Ⱦ⋦Kd���`�z9^�//���23��:ӽʤ�pϡ^,;o5,���Z�Y�k7,�m�f��E�;�fUi�:����8@�����|���w&��mZ�.wm��9���n���������[|E-ԆC�Iѧ�����nڱj[]@��rn��Nj��|����i���c����pl��J����O��������Ȼ��'��Ҷ�l������b񺻛Q�݋��p���Y�=}��A3N$�6�ўF�+i5Z�m$�V�(G�سm�����4I��{&� +/��� ^sI`x�>�Z����_���"S�+�a[p2J��3� �v>�PTƱ�dے�Sb:E��e���(�c�"��	!��� 4'���N^W6�l�:+^���-.����-�Ǒ�!�<d��~�DD,nЖ�+�K���-��.�ҫȖA�̃����˔U<GE���o2�tb5k���E��2ѹ�wS����7!�nf��8�\���y�j��8!��� �{�[�8�B�K�.u2 ��֩%Wu�]� �OZN��5��U�u���.8�e�x0K~�֒ߙ��snʽܔq���%23�L���o����7A�
�7�6��ފ�-�皤�O��. !�ЋYZ��m�Ѹ�Kƌu���ٺ��{2f�{���1�=�z��I�1��l�s����,آ�ey��>!u�)�4?{���2�N���QΓK��cռ��_�J�ΰ�m,c�G��ݓ��C3���v\<IvY\&��*��&*]�� T}���X�E�j��'�O��'�e�2f"���UY̯�����KE�R�Y�g��ü��3��R?��`{�|�8 �#��Q��%�~\^�ˢ��z�@��G &�s���	��%QY���)ƊMP��(�/�<o|?G��jΌ�v6��.7q%�[��A��D���\yA|fI��Qt�]eĥ+��u�	�Q��e��̬c&�h�S�P¬�-;�֜��0�?;i�YM#�B/�'�U�q�W���d"������*o0?)X�_r����G+����+���-�kh_}�J߱�}Yl8���D6�l_�Ʃu�<��_�Wt?���[����]*�3�3��u�$��_1�(۱+�4�yߥ:>�7ͭc&�M>�"/wl�3��M8>�/��-��r���?�C��*�!kI���] ű�}�ab1�,7�������!��n��$��u7�F4eA�����2�V�Vr8_��ܗثoR�Ŀ�_Ȋ���m��l��Xs��O�G9J���ѧD],@�ȍ�En\��q㽹�b�Y:��7Қ��=���������O�Ea�m:I������M⮐@�͏��Ǧg}� �1s�.��x�~<6���c&��\���u�07�`��3��"ue���T�BvR;�+
 �EU��.@[�em��"C��"@3��[�$�R�#sw����+/V!,DU��]�2�[4E_NB�Oh���ބ	�����S�{��'��I��e6�:�~�$ 4��v	$�*��o+t��R�8@S i���{�2}H�&�*��%�	�����VW�Ŷ	6�6���g��w�O<ֽ�L`D���Sjj������n��I�b6�|x��
/U��!�n�y�VQ�=��dy��ܜ�ֻ��W�_>{}y�X���,�Η%	K�×���I��e�L*�:١�hG�R�XD��4t>p%��H3��\��h�J+�s� ��)@\aU.�����]��4���B���I$�� ʕ
���;�[����/t%/n��_�,!xb�#to��%�*��������Y����tB<���w�5�>�At�=.�ƃ���&�7:%�e���_��c�4�CN	:"�Z[93df�p�B�o����o��n?�[,:���`�p������U��f���^�Fq���qR�&��w\ $;��]/�6h%Ž!���G{5?",�T?�&�HIG(��>��da��r¸�;ԫ0Zx��ъ����m�E Ŀ��.��"^	=([������pcN���6+�e!�@���{O���4��8�����!`��]gɍ@�:��i���݄ņ7�'�0P�hCeB%eN`(�[E��o�YH����ꃄԲ #�����|�ҟz��,)���n;���.�J\��b@v~]�0��\�/��Ȯß�u^.7 
����o�&�i��_��7��u�����	�����iL	)�L��H!�N���}�$��t�4D���E�b� P=�ۯ��{�r��0yRfK�)����7����� �WʹM�@M%KP�P7!�z�s��qP�$�ֻِ��>kCn���]jnhN35������[!�:%�.SP�V����B�2�kP#�Q�O欪�E�JQoU"�>M)��ER��T�ێ��vܰ�lԊ����J��Ͻ�qђ�Z�����].���u���dT���C{����];1ٶ(����Rz-���c(�J�����7|l+^����K�,��e%e�,#]%��D�67,Фe:7�������Dڬ.��\��C݄n��?Gw�Y\��-D���-�%�Ee�ҏ��̥���K��լ�p'����wn+����*�7+�O�W�:`��;�PlS�?��#��:2o�&����Ӻ�],�n���5j�᥿C�0{��f�1��T�� ם ��<k�K1��u��i��h�����r�I�2����;��?y:��"����'�=����0䋰�l��-[ܩ��QJ�T����pM�.-eiG[5B@��Vu3��ٻީ&��4���i��%�u�����]�3��� ��O�կ�ڥ��*�ȗ�y�v�ܕ�&
\j�I��eq�9(W^9��cUR�w��Gi�ǽ�y��I"z�N�-�[��Uձ ��&�4a3O�`t-)���"`5����\�m���Lr�!͛�����;iU��.�u'����5�n �+�G*��Р��@T=�u�%Urʯn%�V}�9�ցU�}lW�rgM���Q�Y-�O�,�������[K�v?�j���,�c�/C�`N�M�D�k�%"8��*�����DZ_�u:��Qec��"�Y�6MXB�&¹�V.67U���i/��[�����H##�wj+�����P�72?x�,O�o4�C@��^�f��������ah�|r�V��I�p[��i�6����.���em�U�:�lY���V��M����5�t��n����A՚��b��D����X.�&���[r�ʫ�.��H�du��x�Q�$��#��U#.�`��3�y���ʔ�~���~�����r�3����#%H��3�0t-�\=�Bϵ�s-��b-�D��Z�L9�Y�P};��ۉMߺ��v�̵��Y��L"���"�Sdf�+�Y�
���^�����"}�O[i4/��,o8�_�BT���>~oe	:��W�"��U_}.'��./ɕ�#�F��Kޒ�AƵ��X'�d���s,�
�	���A�4zr�.g��<�}we��r,�䉄�.�t��[��;�꼙��0';��D��M%y�n8��_n��Z�
 d�^����'�S�g��8ݩ��2,t�̎ ���p�d>o�U��&�L#2ieŔy���\+'���8�y�2����@na��MҖYpd ""�.:8�����&��	��|G�p��oB�~���Q��)N�އI�&��ocd��׼(W!}�&ɢ�	#��M�77Ä�DzS7HE!���|C�Vف�%e��[�� �'#��:7%Y�#ZEF<��'͒��q��A�*���p�EC좃6�x����+�g����n«"��_ɨ��EHb�]DIf����� (n�*�팰�.\%[�0qxC_ŵa�܉˓<�T�KD��
K88��!T����f��\n$��,�|F��y�rI4����D�Jxvȡ �����|� _�l]e	h������M��dF�Q{d(��b>��D⍚!Win��� X�N%��F?��F� ��(�9A����*]P�|    0�	�y��E�eqq�������r��:��&�+bǒ����*�bC8�AO���D�TNXʯj�$��y3�q�}C>��ҧ ��A�J4��3i���ӌE�N�,V�-�te�W	}s}H��P+(7a-B��$�b���"�*W�~�6E�,����X?�&V恚��,zK����23S�TN#��A�s��3�%n��i0�[� �'t�6�G�֞�������p����MS�;�M(��,ǃ���acH������陡H&'�UR�ͽEF��Ǹe�VK������:�eg$~8��%.�:�a�#���,�92ܮX��2�\E��0��8 � �$����n�xJ������NP��&�}뇿�9��#�h"��($*��O$��;Q.g��f�_����������$���#M�"z�?�m�3��9�����Y��N��x� ]8�/��ي2��0�a�JS���4�ĺ����|�:�3���`(�>���iJ�?�6/01e���FY��D9�zȭ���CN�~���\���NS�CL ���"��,���&�l\J��%{Q<�!~Z�dޫ����f��S��:!COT�q�$�jc�[�@C{�h`+] ������d��DXd���	'?��j=�#Mx��^��3����F�	7�_҂A�*�"���Zf�U���0U��N��`*l�~�� �`2�2-A�<u��0U��m�i>�(Q@(,�ݪ�vZ��E���K2�cU,�b�i/�0Q�rY��o��u����*�:Ra���2�s����6Y֢��7,�M��4�
ᚁ��M��lF��p㳥�N۷��M����:[�c�,�$-�H������X����l~Z�	�h�u��)�_�~��V��R����H��\o���p7��e��2XS�NVF�'#Iĭ�p4쓷�o���+���vO?��_�=���Aۄ���*F%��!�^�rp�6��J,t�Fe�5��f:�]�{N=�$�8O?�KV{$��$f�5��]kK]�P���@8R��O^4l��]���]��ã�jӞ̱+���cl���aFsh��a���� �E8,���hN�woԯ�\ LV� �Ib���Цr����lX8{�$&���,4�Ϸh׫^2!�_&�ŞY`�y)��H^��Π��.���$�3�Hy?Gm m6�̦�J�U�jMaQ7���s@�$�R�������7�6�����B�7���\�r���r���W&�2T���EZ}
)�V��#��;pHq ��\���ME;�JT�/��U���Sbl'��d����R�g�kB�xd��d�,)�X؊�ɓ$ɩ�2�4v ��]TrP��S���֦J W&�n����͹��\b��vin�2!�`��A�h&��gQ�V;�fmكA
e޵>U����m�~
���6�H��8|����:�ȿQ&Q�.#��X�FeUڃ
Ѱ$��JjV>A�(�t��yq[}d���8�W�9纖JGqHhc��-�J�WU��Άe���u �r��G��OҎ=�g,�������'�,\ںܮ3v�Q�FR�a�ɈǱ&6y	B����*åCz����Z�BȎ�%NxX�'|��T�x-����j��4u�4��=1�XW��5��a!�	��nw�j�m4-�����~Ef����A�h����2eS��Q����W���_y?�V����dZk��u ��HW`Dv�v);��w�*�	�[�b��T|W�	6|��X��>��X�D�？�Y�Ր�/��'��J��L&e!rZYl����/��O��.MnD+K�x�-UR��oɃ^�����ֺ������X�ǖ+x`��$Z�('�D3��J{H�U'׾F	o9�9��əm��U��p���*�����!�x�\�je�^)HU{ZĶ��w�A��W7��VI|�>�(�,��P8�[ȸ��o�@��&6�EJW&,Ӛ��.Z�-!�C���"�xEZ�1y��KR2~�>͒����*��>*D�h�j�	@u�"��a�[õB'�9�r?�o]�~���V�.j�꯮�e30�·�$��Z���9Q�K�ږ*R�N�%!���!}ES�ȼ����Rª���V���˂�.S:fC���"]
��L�U�.T��	r�ʬ�9-���lu8��:��@rbQ<���H��+p�ӁwL�OT�~�O��?f�a �L@��{������1374�kC���������	I�h�����#9�lT�h�%5'�2�d@z�#�)b��=��p=Q_����i4��g_�Qz��^��f����yƖy���rJ�zC���m���P68)�+:���:��$����9�2�/�խ�m
���̪ �;�O�X�K��9	�zp�
�]�������vA�`>�o���e@�������y/�w��,S1��S�X�Ԩ�K���o��o���ś��Z!�z�v�8!�k�* �����o}�j'�~l�N��:D[�M�	��st����{?��:8���
vb�V�LZ
�y�\jj��h��^�HI���HM�M�X;2L��m@�^a���������oԏ�)��	AK�7-����Pw�4B�4E��N�#�IFJ]7긓�0��-���ˇ�2�?�sТ1I�#�M�B�*��$�z�t3��,��^����6r��u�T��]e\���:B_%�E~��l�X����}C\E�B�����ɶ�K��}�)y!�@3���r�JkCܵ@Y�~��T�Z�Jy�[�-���iI�0�+?*�>���������Bi�p�D�ci=�n=z�9[�}xK���2+�iS�6Mi��@�HR;C�8I3�+����J���i��C~��2�f!V9Gԑ^�@g���h���<�e�� �����`�&���xٖ���cxD����B��Qh��ԅ�N��F�X3%��/"2F�+��\��KUt��.Uѥ*�TE���R]��KUt��.Uѥ*�TE���R]���*N�&ó��:f��w�T��X�L�����O;�xO���;C�F��>(@x��c}���!��W�w��N�8��`�ʹ3i3C�
%8���p�T�|m}l�)ɗ:�hJ��	[����':ޫ�H,G��k�:�����ÄGNAU�?��3d<>���ۧ��cŽb4��|����%g3|���{*m���xNzb ����s�N޼4������M�+��[�{I>��7����Y��)0����y��;l���M	�=!c�GV�X�SR�%��ZB�w�8Z�u�ڡ��gpVs��>gR���a�kO_{������,�Y�N2�������T���(r��"μ:��zG��6�C�d��n�|���3FK�h�|��� F�wx�=�4�?�����6�i���_"|t�#<ѐ)�P����Z\�����$ >S�����m�`E��i���Ӳ�}��򍧮K����0K�-�������k8k4�7U-?p0�/?��K&�N���Sg��SZ�/,\+Zȳ� ld��ʹ��<f�r�pVF��{}�ȝ�Ơ���Hh�C����N��Z�dp�X[P����5`A���:��Y��H��/����_k(e�f��C=rx������ioƙ,�u�Ҏk@��i�����ohɑZr$ƣ�ȁ��h;�cfo���k��}��g���pn3�m|���#DebcI���e��8���͉���PN��˂����׳%뷥�J;:��"͞���jd��S+j۰��]�$}	IzL��H��$�{_�G��y�~�@�TZ�����Š��TR�����R�B�J�w2#�b-,��}�ˢ����=��q�"�[��f���n���FJV]]U�2"��>sss���}k���:�%�
����uf�m�7r1z7��d��$��ڙC.�R�р�������=9�3Ya�#�x(�M��ڬ�eɤ��,��_S�6��V�w���c����ч    �{�g7��Y��(��-�p4Z�)�c���Ɉ��2U�W|+��B�R�=�Cծ���7J�����2���(m�0߬��	������e����<쑍Bs��BF�pc=R�y�d8�y ��)譵�8��knV� �X��z�]�B+ f���_e�X�>��,�d(Cז	�PWA<!��4��W�B������|���)s��d�?	�bu*��	V=����_�[���H��wZ1wQ���"��y�B�kg����,T���U0:��k�Ǹ��7��yG�ehtF1����U\�ݬ;^�`��>dw������ؙ��G�<}^�̄����PU����@����x���YԸ7��*���ո��%�>�tR�K%�<���z���mC���;2q��3�L�l0y��1՚��^L���rj��+492�so�5?�r��f����b��1��%�XZ�J���|�����¯�|aSs���=��6x�^��f�quG@���ٵCOeGb�y(IӤ[)F՛�J��}�wy�z�Ub4g�*V��xLW�Qvp����/��Ysਂ�9P ɷ�"����cj ܸ���:Ɠ	�@��O`��&�ܱRښfۺfg!oM�dŌwC�ۄV������4O�G�Βt��H�"��}�>�Ň�y����䳏�3�4�H�>�8>�σ�=?����>j�>9����>�]㳏�3�4�}�n��g��0(��^���,��:�����̳p���y��;V6G�OK�*����=z+1�l�.Q��&�Cq����Dy����.��9L���2aЉHĽH$h��^�fb&#�'.��D���OK�}D*'ݗ�Bڢ^<��#��O��xF�&��@Ĭ7:�'�rJx�ys�"1���.=�&Li���KO��iA�LaًZ-���s��L`=���'���a����\F���+��G)S�ՔQ�d,SN��AB�l�h(�/ݩA#�H%F�Lc�Eu�n�[�X֋<%�4�g���D�h�r���0�)��3���Df�$ey�&����4��H�܉󅮏2�XwX'h=�	�W�gSֹ��.Z.S�ǝ(W�Oҝa���| �l�a�}�9E��D�?�(��l&R��g���U*<Xx�0���l`<x�5�f��kx�WD���t��u"�~a��$�¤{ >�a���e��N�a��0LE.f�M�l68�=�E��L�^������w���S�&�>]��ŹY�P�7n *̊���/P�8I�w0q�4�7��d"���ㅕ�d:�k%"e����u�:�����၇��}x{X<W��.�K�CQO�B�7��H}�=BǄU��;?�vS�l�د,��̇x����8���f������(Z�a���q:���7�J�|X�%ۙȝ���.�D?���\m�D�F鋋�ա̸J����*����"{8�m;�x{�%�.4B.��Ƌ��ؖ����܎����0��`�q����Q����9A�[�$Fٱ9�&g�,�m�Z��J�	��4C��b��^vx�����Z�vo��]����]����e�7�Oǡ�EPi��(6����%�'��.�"�0���;�u�^� �OsM��!a���]�E�E���I,�`/�e���^��Qcp�G�(͇=�g��-Wà��{���l���a��L-F�L����8����𾧪�qMu+P�Qv��N����i����;�� )
�j���)�A�5��1��*9Fٱy>��}> ��
M�eF�LSA^e�"VL����-��;x�Ft��H�J��k���u��P�݌���<縗��w�G{I�Q���u�i4yxg�����B/�b�`pL�js��-F��D���r�_��j�x�S���x��8V��͏R��yJb[qRL^`$�de�����O����}�x	,�R ��8-�R���ί���f�x�����C����q</gսc�:�tt��Lo&S_��&ǨLռr,ӕ2u�Z��4`+z�$]��F%�񟪽�
]S�vs�O%�{dMu@�m�ͪX�*�e��,9F�q8ɡ��HP��z,/Ǩ�e���ϑ�w�grE�2�b����x��7-y%*P�����Ƌ��mh1Z��]�Ý�;���J���X���xj`'�(;�/�D�h��Z>��f����R����B� ���ow\OeƘc���/��I���M�����b
;xI�\�[5��
����'�)���Fqz1��k�lӰ��r�1�W;<�����q|u/Ǩ�a@`_^�2���vZ+K��H�֔��*5�r��ih1������X}��*[b��U2�����VJ���Ũ�5��u�,-F�}��:��9|%7��J�S�|�W�$.b�@b��LP��Ig���_���R�0}��g��/��_x;}?���ta���t���uv~Ѧ.����L�<կ��B����c��0����q���4t�Q%����������h�y����m���:��JV�jY�困�������?�����������[��@�@��s>���I�K����z,���@�
Yz6�������ya����MW�?�0�&A�3���)Qu`�:��$�L�=��P.b���is�f��X��g�E�R05UR�w�iMݸ�d猝�r��\�,��Y%�,�����5��h1J���TI^#mj1Jϛ�4��4�"�_bT�\������.b��o��u���x�zq�>l�������u�2��>k�i��_?}f��u۱� ~n�n�`����|^�p�hڹ����|�u���޴ߠ�N�GO��@�_/�����DH��˓��a�o�Lk�v͆�m��ovS�͑/�|\VkI\����#Ǩv��6��3�nq/o�J��h���e��h����R��"Fkԭ�T[t�"B͛���m�1Rs�3��O�E+1�ÿ�Gb!�n+��1Za�vV���A�>�"F��,<0�j`F�"�?��/�G�Z� tU�_b���j����+_s��ɖ"FK��$Vi]3tUgLb�ި�&�V&�S-�Ĩ�}���$�Vqgu����0��@�c;^�!�ʙ��Q�a��z5ِVjH�o�2#�8|93��R�:R�Jf�:��h1Z�k��77�շ�36ۣ�N�Q8w#��g������/&<,b�^׸�������=\��b�:�F�$�hܦ���7Ş\Q?��������ٚ.��P-�!���Ow�(���<��j�y�uKO�n�4�_[]����m����kVYϥE�����9�F=cװT�V�1�⽕E�.Z^kc7�h��;'3��o��q����E���|^e��ls�}��~�:x��}ں�=*��}��5r�?G������:x�C��~������ez����==>l���kk�����Y���ה��u��l��:��lO�Q�hݻUD�X��\����[%��o�������b�����s�{�7�����w��^a�{��>~u��^B\��TF:��}��~x�2�k����zn�~�5~j=?�rE��@$?������q�::�1��8|u��HD�-���1j �`oWU��T��C�wCa�[����}�Y��}�P��������U�Ҿ3������$�Y�������c,*���x�5���Q�V���kw��v��u��u��)>�)��9��e��*~Me�;�r���ڵ6l4��h8��A�U�k��6����
V~V����=r:N`T��]�����>����TWUȥ!E�*i��uR��U�{U�����bR��i-�w�=XYYYQ1��"�������"��U'P������m��v�=4j�Y�P�Zo�)��6�,��-;N�Z��:���~�\�����
.��J��!����Ǉ��%���=�7=�:�5��7�ݬ����V1j��ܥv�n�no^�m�	����]�6�6��FU�l�Qm߬^����:����qT�U�]c�>}����T{���U�mu>)1���u����b�bߣb�jXUbT�mVlV��*�CU��	����    \��'�ڬ�uSm�&�����5�6����갫^S�cT�=vFX�k���b���W�^��~���2.�3^f�.}��gM��4��򽉮��z��9��G�Y���?8=:�حq�������������~�/q��?]E��q)$m�nɛ��ڂkWp��-��-�h��Q����g�fŮ�bS���Wm�i��F��ʛ�fӠZ�д�����O�S� �N�n�E4�/�򴘮���0�/"?��`��͏��%Xו�c�
FJ�j�����+(���\\L���\S���ߒ�՗�^_��JIb��UR�+aq���
�R�%,21��Í]���"=G�c�����R������B��_���MuP����2�9��@M`25�Rc͏�(�&�}�t��y�Ӌ+��4��F�Ǘ��,��GF��0�ZwDC�͢@�6�.�-Io��ς�_��He�5�~ ��l���	�8�F���<������:�bl�h3����'��=�M|6M�X (���l&y����]�ߊ��W7v�I��_i���KO�����e�=�y��~��9�s�8��R�d�΢$�?��(��e�ϻz���z�2���쯤�r������
��O؛�/�}���{��x���.É���f��%>��(58�;zyrj<��ɣ���<���q�:����#k�z}�u~��pq��ᣇ|���|�I�������w�K|�Gi�c�M�S��b4I~��d4ď<���L���{3����L����c����g�����W�������<4>wu�z���������>��/>�;�_>i}:���Ƿ?>�o��G���,iOۃ�Eg�����O��|p����ɧ�/>�/G?^��N�Z�����M^^>�/_��O=x�16���߾�i��׾:����؝_�W?�Ư_a��i�{?�:�7|���������.�~:x�]���������7����{����u.O{���ӆ��������O��t��v>�W��^�yt���W�����ˆ�Q����E��?��Qe<�#&~��y.}����]����x��� ʝ^�#�e�ӫq,^���~r.h|t9��iQ1�?:����i�#G�P���Q/5p�f`{fc׍��]�t�ݦ�ڻ�7ݎ�u�g��i<�mu�Y	ٗ���%��Qc�n������}'�����������'g0�9��~�7�(	f�ߙ?	ʞ�( ��������4
���z�5����K;7����d�.~0����T�q>~�'S!f�L��x����ޭ�+;��r�Y�+5�.�D��(5�!�jj�#1J���ƥa���x&z�����08#�k_w�������a��	"k�&f����RÁȪ�qԵU�j����WDJ�Rc15US�α$F��Wm�q��J���V!�Qj82Q[j82Q!5v�����b��LTKMځ��p4�jj<[�Qj8P-5�yJr��p4�jjG���X&G���%n@S���29P!5Nh������p4���p4�jjS�Qj8P[j8P95���p4���p4�Rj<<���(5��g~�^�(5�+5�WP%���Ry���s(0Ze���?�tO��h�t��0M��pI���14q�N�|v�1�����=�~�+?���z�d(��P���1��$����X<�x4����xp
���?8�^�s�a'��b4�$�a�{�Ɲ(�um�����E�N�N��F�����p�>n���G��b�����§h:�:�9�j�����SqQ�&~fxw#�F��X4�G�x�g��y28�P��(�vf�L�`�nx(H(��=Ǩ�}ESoU"^h)	�Jɭ��(Qe�$A��"_�ks��0Ed�bԉ��i�":�
,��ُ�Q��}c�\qϖ�o�S3��^^�u7���,�$5�3,k1�3�W[|u�% �]�Qy5�Q��k$���%:\��mZ�R�dk�Қ	�)^e�I�r� ��f��ncO�#�y0��岅"���̳�w�s=�#x�ڃO��/߾<m��x"=J<=�]�3x429�M���E����З16{؝�z����T�D�����-��_����<9<c��B��$ �TT]6mu�A>�\��8^B��p��%���E�B��[�&_@��7PN�l����;zw#p)ů�$�#�w&�b@�n�(���A&is/g�Cs:��A2z���ڙ�;��Mב��I�t�N��Ȩ��	����k��(���2�P2�"����u#���]�/E,g ���D��a���Y?���C��Q{�	D�4
��Oʣ��$F�P����G4�h3���?������Q�doFk3ˬ��������vG��0A#���IDO|g�<��]\П�3�WA�Ɖ�/q��af���n�|$�N��4, ����-	U�>��{��B��1�N-ҍ��a�~�$=�(���ܲ�/̶�߾�M���췕���]�"���٢
�`�~�$=5��cT���:���1�h�pfV�p�9��Ǆ5j����QJ����G���+�����dl�d�Ze_[���y�(%��W?���T?
Fk����D�QxD����B5y��>~lS��+�E�ɛ`xL�M0�&ۄ��W��dہ{�Vh7���f��zeW6����S��5q5]Qs�%��T����ZKk���B�L�����;xc��]_�0�7�j_e)�(E��k���)�S�Iz���5q4�st�����Uͮx�/W;g��r�sy��A�v��
ŧ"�����/�1U�����_��_�����"����;"��L���(��"��1ށ��ނ�TVi$��)�R�U9g�0��{���N�גʻa��왼�w���i1��r9�*�<�/8:-���8ƾ��d	O��Ye#�T���BO�c42P��3�~��Ӹ�������Nn�y8�ad�}FXi^� g�o9��<g&h�'1����AV�)���q:6䗄� #$s���]��8�6t
&.�$��	F�VZܓ����>/���n"П%H%�Df�i<���L�$�JÆ	�����(�l����bdC����u����0�c(%��s��p�QD13��M��z��$�x��A�`:1͌&0�|6m�\����>Ve2;#�l�'��!Dh�47��aQz)W���ϵ.cl,�)�D2���!�Bg�Uo���Δ�?c��L!X���k��F/Yr��fϋ*,F��$�1j4A֠?e�FcЍ���.S���q��@�O*��+4I[`�3�*�Cź\�_��J���@�5Ƒ$��ս�ȅE�YY����|IG��f�.�zM���Gc��~\|c��!\m�)�Q
\�|X�PA$`I������!`��&j|~x)ml6����z��c�c�43��u9ÿ�y���Վ��H�����{��IL�1TGxOK�z����[;Ǩ��]��I�k���r�J2౏�>�x����>�΁����^o��V[�T�X����EU���~Y�=5'4mq�m_��փ���
�k�Z��22��ok�������kT��ζ���Z���EW�m����}���j���7��ۈ�)T�x[�J�������E�P�09x����k1*I��=)YM��ek1Z;��=)��T�'�|�ܭړR�}�U���e������"�ͻ�__��x>z����x�|4(����l4�I�onh�òB��Xw_ƨ�z����}v(+a�|v
����i1*��}8��gG�sP�Sp�5��)�i�s;������G���+�͑��#�ayxE�kk1J��ULQ�=�[��
��e�*���ۡ�j1J���E^#4M-F)�ٍ?���,�I�lE183)�s��+
!�6����2��jE2���Ѭc<�$c��t�I���7w4�M,��,b�ٍ/�ٮ�mW�v    �5;m�l��f7��fD1���5�Y�'Q�h��/�ٖ��h��/��Tɛz%w��f[J��"F��~A�&e��f�Gy�������L�U����(b���.s���/tZ�203U2����Tf\���_��'�a�Qƫ�l ���j}0_���z]M���h�����?8=:Yo�}74�7�h�6^�d\�e��r�wU�ʒ�*E��bʻ"Fv�&�
&޷L�e�bf�d��(363S!3xWk��(33S-3dV+1ʌ[Wf�3�����y��Ϋ$F����#��(}>�W;�|uE&�(}��7}��y�4�C�fm�R���?���?��p�F�"F)l2���0и0�օ�j�?��<�tYĐ
�RXې��M�c���J�RX���WN�����1Jam�,_9��PH�R�ј�Rh�5�Q
9"SO
}�$.1J!Ge�Ia�x���Ծ�6C[�)1J!O��J���PsE�m�Ծ��fh��Tb�B��דBܧ��(�<��+�d�Pb�B�گ�Ф#p�e&�^�}��Q�xR_?�\��-�Q�x:_7��T#����D�~�ݜ���抺�熖:�%��/�#�z������K���B��<����ԍ<_m����-�#�S72I���q����������q��~�9$���]<i;a�y��aBb�<��ԍ� ���%�#,�#�#�M�Q�8�R7�Kb���q��f�y&uX$F��K��#�Z$F�s9�R7�l�%�#,u#�	mu̓%�#,�#�쪖%�#,u#ϥ{X$F��K��#g�$F��K��������q��n��t�.1JGX�F^#���<�Q�8�R?�\50-1JGX�F^@O�I���q�e�VBY�qJ)r�h'0J�V�D5���TzU�m:+j�ͨ�S34��@`�;�ԉ;HR8��c*��N�Δc�;�Ԏ;��b�;��Ԍ;O� )�(wP���]��+(������P�5���+���q���-5�2P��r�p�s���\���9F��L���4\�+�9NSo.-3�U+1�%�mj�%�H�r�q��si���r�r�q��si����\r���\:���
$F��O��tI�t��'|��ԜKW=Ȕc�K��ԞKO��I�p��O͹�B����\rܧ�\Zd~)0�%�}jϥ��=K�r�q��s�?V�Z��>��A��y<�Dӽ�����}�,$�xe:M�i:I�{�d�{�{2TR}�aDb�h
UM�~�V�64�Іv���Жp�To��1�)���S�mO�QN9X�%�Z��.~J�r�A�-���pjk98x�%���(�D����1��	�%#AH�o�����n��3�<Ty����k3��`�����]�y�MFӸ3�/��edL��h�h�@%�;��\	����aJ*���+wV�+\��"J�KLr�R�1%UPb��.���` ����e����|:IM��?]E��(���W¾:���k�_��&����Y�x7T�'_>%F�j�k���ް�c�(�U�jՠ̸�pu�a��7.���(�m���t�TG�גc�(v$7��J� �9���K����Y�(v37�ԝpBW�c]]�]��,Q{��)�Zd,�ʊc��'K��%���f���hX��p̲N���u`osc��6�-ɨ�c�[o�4���"K�ɓ�-㶡&��1ʭ��n�6�hk1�-OԶ�ۀ.�J�r0��ƭC�m�;��<��2n�j.�#�Z&s�U�:&]M��#[ǭ��%F��-�[ƭZ�x+1�-ǥ��[Oí&�cq\j˸�m�Z�r�q�����p���ӱ8.��r�q����k�s��r\j��uC�TO���R[ǭ��b�[��R[ƭ�-F��Ԗqk����r\j븥6���d�Km��zz�Qn9.U�.I��kk1ʊ��]�������4�U��e����z�YK�Ѣx
]��� 9FYi�� 7/��Xe
�m�-FY��T�E�S_�Pw��u�gm�qQ�V� ����1�JY�p���	�P��,1�ʚN ~6�b�(v+T m�eeM'>����\v�R �T�7s����X�(v�R �S�I�1�ʚN ~V�$F�b'�2h���s����X�(v+T [�$FYY�	,S;�*��閺�k�N`��<v+S� �H�eeM'�LQ�V� ���ee]'�DQ�V� M��ee]'�DQ�V� ��P�QV�t��N`e
`�� �eeM'�DQ>;��)�C���(+k:�e�b'�B�H�t�'��5��2E�X���h9FYY�	�yQ���ۯ��� :��`6x�-?I��w��xd��l��z� `=���Y�o uG �i2Ε�Mt5ܝ$�4 	�Yڐ�����D$\2�����X|:���4�ݰ٤��
��U����F&k״�R����j���\Y���ni1�
��g�H���1��.���u�q����[e�D.�1�J��uǚ-̺^oK|�}�ʔ�:ꪮ�(+e}��
s�W�_�0*S� 4����MŰVa8����r_�Se��=2e�l�i��D���U��|$�*��L�H��R6I�Z�9������_�pI���QLO;fP6\�Va~Y����ʔˢ!r�QVʆ�*L��%���n�ZO��e���QVʮ��<�R�zp�`c�Q�0��%�o�;��9FYA�0�'	�ZzQ���pt�2n������BsI-��{�U�O�t�t1Ab����GW3�u�_N�y�Q꾧"���+&9,`*���Q����]{���r�;8�1�#G(7C�*���J/c����I�g]-F�bǽ*�mS�QJܵٿqQ��ن�g��U�e��ț���Şưj����-Nܦ(^����@�QJnyj��٦#Em6����lx��㴌Q�������d]?�DQ�W�>u��Se�뇗(�#蕱�k1JI�͍k�1�j�o�&���Rr�S�)���U�os���,p��G.�(j�^{�k�3�����w�TЋ��]_�QJnyn�6E�|lՒw<7�����ұ�Z�J�g�I��j����f�K�غ����c��Q�G��������P���c�1n���O�q���a�t�aA��A� �i:���aQZ��~܃�N���|�u�e8�n�X�2P�C4����Q:����F��&ƃt
o���5y�5�D�̅L^����P�{�w��q'J�E�@G�-�Ϟ{C5@��1���F�w�؋X���gx�S4G��K�Xjp��`��`!�&~hxw#T�n������/��<O�������<C���僕���Q_��f[bTy7��Z��x��c�Q6Bl��c�|�HS�s�*�����[3�u,-F��c�e孙�*s�������My���}ކ9�ӿA�&�J�M��W���.�P�'L��΃�E�Pқ��{4C����3NU�ű'|�ߵ�{���읏��Σ^�=�D�h�5�RV_s�6��ֈg��ō���eB�G�7�$˽9Fx��~����x���1���i|��n�=H�#�U�����E�x1����4���@̇P��WA���a����K���~n,�/�� ����4$��TG��(�9F�**2�����Ȣ�t�^ԝ����h�>�M�)8���1�.��u�nm��?�O�fb< }�?������8�"�vO�1<1�w�����	u�k�]���Bqo
#�N�t@���t�����e�d�y�6y��ټql���5ٿ�1�#G��E����j��;�Q��V�a8'U���R��>�[��H�Y����V���%�h� �5�H�,݇om�u�S��~U��j+?���0�T'NUnNh�S�QY�,�������%N}�M��0�y��@�e_x���B�3<�� �M����B�&��@����	�`6LR F�t6�$�S�B����F����X�@`����;�$P�,˃��S>�O_E�$-V����2�7��sWd!��X0�ׅW�m�&��Q?� vz1j_�$��)hOG�T0�忀�&]�1��� Q  ��,7�a�BYM��/�G�L�p��k{�k�E]�m;�e0^ occ
N�l!���$&��P� ��3���)ħ����|L`�2`h�A����P�|fPTy�X~|4Aߑݮ����j
�l�	�����~�񘂻�*^
yFh&*)��	H�/TI�fl�E��[���|zI���ջ�U�1�)���8�����b$-�5�a<eÎR�y���'�ؤ�f��d6�W�(��
2��:(������?�G=��E<�d]���zb!!���=�[��%zyu�	���?�r ��I�7E_Y@Hy�$�� ��YW �����N���Og���Po��1ΜG���ŏ1LG�a����Z312(;�a���o�Jyf���ʥ�&�Q�<��U�fV�&,�j��M	�Fh#�w	yZ���'\jͣ��b�G�֚G7�b�G��SP#�@(��
�cTy��ܑ���[�ݚ9F��׎Y%bHzm��N�ހ������Om�����G0�ϣ�8����z�lL.��@��b�:��"�6I���}��|S����x�6�%��Z�p*R��3��`=�A��˷&�1��Y���5�������=�)���Q��|-o�c����d�yw6�M��	�r�q��>h������|q�d� �g-r`-c�S�l	����5�(�O�yr\�ɱP��e�9F����+%�Aˡ�9F�0�i��d59P���e��%1ʩ̓u���1f�Q�u�ipZ|�C������q��
O�*�Mp����\�8���/�˪E��� ��k;F	�Ĩ#��(�|���%DXJ�Q彯�_j?J��n�z�%֨;-�jh1Z���%���#�����z0���#Ǩ�Z<��2 �� x:`oz��B��b�.Mb���0�r�������<��k���e�U^��pL���2�7<�`�*��u�io��Ei�}�#����/;؎A��h|[b�S����ZZ�O$F��i�7 ~hidh�dhmz�j��:C����|��l�1��2��v�^�:����̒�ZҨ��AbTyyf�� 8�z�Ĩy�6u��-_�?�(�6�l��cԅ�ڶ���Q_e �pt�7�ި;�	�eW���z&o2`�^�>WԦ��˛V Wc 4��x&����-kiݫ�QN9�*�uPT;�Z�*��F]o �k
�acsk$y�^��h]x浂O'4}-Fe��4����H],��}K'�M-F9��a`��V�zd�U^^�_a ��{�
���r��6b)t�4�9o蝍=���\������E��@ó�}����w���j@"���|���PTA��K`�*��VO:�R����rW.q���lnXb�R��F�b�����Lx�h���宩)f�3���r��/:K7y0�1��.��.��0�)�a�V.���x�Ĩ��W�� /O��K��л�Qڣ�$��jn�Ų��]��Veu�m���0ZM���>�H������V`D�~X)C�L�Feȁ:����54�چvV����sP�ס3Y��s^�ʯ��?��A<�F���,���w=��$FJ������P�_�&��c࿭��v�o�{�ܥm�EL�B��_���et֏�{en,]yYĴ�ʂ�2[&^�n����ʂe��e��EW��� �aa�
�>�{uk8�\-F8uy-zK8��v�0ʩF�9�Ne�n�QN���iO[�1m��j�A`Tyݿ�L1�0�8����]v������7��.:K��~�YZT;�q��琉j{\�Ǵ<_�c�>_�
���b���j�V���^Sn眹��<<��PW��N(�gj1��Mo��� ��ĈA�OJ�j��@�%�҇�q/��v����ֹ�pR�E��]�-�[��R�����/`�w�8�'R^�%g�]G�\�u�*q��80�hG��5�'��r�FI��/e��>~)�X���9F��'�u�@���1Jb�$֔D�]-FIl2�5%������M&��$����(��NZW�es��h3��%�S���$:<��U��V��+4^������w���;�      !   q  x�m�Mr�0���a:�'ݥ3Fbm��䊲3�}Y")�Yh��=�x o��($��Q7ǰD��8'Z��5��	k�-��9�=�1ťH�HZR�� ��k����^p�8)CʲH�v�ǩ��t�5���1t�
���#��|�V�?��lu��R�&� _:�M��������X�X�noX�i,PY!�T�ݙ?O�W��@�m���j�"n�rK��4T�>������cz�ݼ�J,�(�鳞)ؓt��9���xb�G���R8WI�+"O����/pù�Ӹ�)��MV O�Co�K��I�*E[+�jk��y���}�B߅���=nO��*�M�$u���~�!����M������Sԍ��]�x��'�b{�͚BcsS�m��L׆j'�=�䡠0�0��=�1l&��*�ͶҲL�&� �"=?�|P�������;ZQ{L�-�`�Ɇ{���R�d@�&{�ǷL��QC�$t��{�y'���E�oxtۗB��Zg����|�4������e}b�y�miNXϤ� �_Bo��^�3A+.�T��fM�H8-+��<��@��ۜ��f@�� �x%޸��B����׫�����2��W	O?�N���      #      x��}�oiv�3�������v�ؼsc@]F�P��$5���bw���z�"��H?؉^�ia��"$F��y�����?!�w��.U��H�Yq�`W$������w�ͥ���?��?�"8�.�b�q�(������,N�$̂a��e0��1���Ӽꬪ�`M�4��Ϭ�o�9���4�� Y��,8���'a��y���i4�˪�Lx�g��_g��Q��&m}E&e�����͑7���pF+;�ª.���</��V�G���,�\}�m��_8�F!��`r�g�؛�&ܶo����*r���Q�EeL����"ZF�bZ1�]X�s��u�ۧ�T!ފ���ޅ�,�S�U46�ק'�0�=8�c��"�C���`_��>?�����t,���0�C���:�'�:��>X��>f�7h�$��h���b|̀4��:�q\ ��:|,��0t��~��h������`�,�t��cB�i7�?��bu�;"�I���p<�´�\��x�?_��~�g	"�0��:���he�3���!}W�W!�!��⤮��Rѣm����/�h3�0�"�z�Ø����#���xI���i�c<��'�:�1�)>ap�b0����Z�� �s p�|�(v��O�Z�o~?X ��sk��"�-���s�p�l|�	�4C�퇶�{����l?�
CfϢ"N�����x'5��@.�#�����W����u����Ngcs�_��/�w�F��$�� ߵ���p3z1}��	È4#�Р��qM���,e4��A��&��8����IMk�����q��<*r�Ɨ�E�ڥ��:�͵.�	�K���Y�h�2,t	 ��u^����u���?�9����E����<y�WD(�ì�/���E8����X�����zf"'[EXє�Mj�Bq��%-����AN��
���s��"H�-�h�()��譄N��O���8����Hi�1_��pc	n�f��1����������{/��D8:�b^ED����L�.���3��v=ex%��;X7��G̶���C¦2"�Y�yz�X�*�b�㔨{�Ec�Z��5ݷ뚼����ve����H�b�/u�nE�1����z��ӣ����8-E2b��t�	��o]W*�=�&\���C\]z���*�a�P���e��jt�Pm�W�[W�1'�博��c�!vg4%XmN��O��R�bN��:�h3��� Y�a��t����*��L�#�I\ ����3MK˥�:<�[��遼��5��A=$���\��a`��f �L2bV^҃U�dy���e>A��i^��yB���,ۧ�y������N~� �7�t�ޣ�ո��� ���Q堳�E���I�$�<��DO�1-��_ �r-G�@� sB{/�YO�-2�����:`��P����O_��Q�ш�Փ��rE�I��Tx��=�����K��&����_�ф�*H`������Q�䲸���[�𕦋sE���	1i!GJ\�=��z�o`�D��ts����]���MhD׸��u� ����N"��(���ItU_a��y\��	�H�!2��+���Q�R�8Ge��f�HpO~�6��Q�L����
@s^<i,t��TiI$�ɎR�����`2�M��+��@V���������o��W�����?����$�SQ"�R)������[{S�q>����0YR�x
Ђ�;9*e��^%ܘłđ^Ý(�L`��ޟ@��bCSmP�s�o\ƺCn�1�K���iH���R����'��\\��4�JRDEX%XN@�a��$��%	}X�1p�I�א?�h8�u�� ��8�[��H,�R�H)�H����:f_���	��Y��_��@H�3|���`�����$�s��p]Y�gyYw�FL2<)��AB����~/�z��4
V�<<_U8-�1H�C�|LC�\b����r(w]�̔3O���J�����c ���Ժ�1%��D	�����v�{&9��k�C�A}�b�k�y��K�]D3�3����
-x*L�LPF���qg���D铳��LD]�y�ϗ������Y<� g���I"�b�C:��;l�lB��@b=��'�����a?��!zf�w���LJ��	DMfخbԞ����g�����4�ky�+��ա*�,rBg���
��at=q4O�)��9U�N�XH�.��B\�r�$���(�'�Q=x�/s4��ق8(�n^��+k�q��! 0�FĻ���J����/y�IE���"�*i&Q"�*�I�b�xՄ��:e�����m?8�FH�so��*8���W�m49+>�q)�v�ꙹ��!��v��W������g�L&a[U[$A3��"0�Ѿ�i4�'(��-�9\�&�PqEP�@�?:�t�@����3��̅1xN�21�C춗�3�`N6��H����U��L��0�P CC5L1��&$I�i�/cq}�t���Nik8�뺰`5�r!�2��a��(qR,�5�'"�M�n
��i��8U0	�Gx<��\q,�q�W���2�p	kT����'x�	�$��:����(����-�V!��/w���3�u��!�֍����a<a�P
�-���a|#�hг�P\G6�)fy\��<��2U%&CB �W�S�S9��,�
��.W�4�d̐ϦDT&`�h�k?�6���cRBX��J��F2?}-��`��َ�BW�
B��L#�%	�����1�<�wIrUヷ9	�����(��s���$4�U �eH�0���cu)K+	�N�0Ŗ�|�Wj��e�2�5��5�"Akd;!N�C�8a|��!�Řj�ҍ� �a��!��$�@�Ѭ�Z��t�\#0�Br�=��L�Q���p�0ϖc �/�Mzhm�r5Qъ+��I,�{bn�9{�!\%��kl�R+=6���3M�v���¹M�+��\8O:� B��=k�g�����Y�nbS��Gt/��ghώh�X2ͳ�Zh������;�F3\F����Rr+7aĺ(�p\O|�j	�0��ԧ��ӳ���y���ٱ9cgc�ⷐ��0v���]�)�#{���)P��
�ji�J�C>h����o�lk��i9��KT�$�d��kl�"!�uDUgVjW�Bg\�����8%	S_�l�V#�K*R�o�JP~��ì1dpíj��j��`�ڒ����%H m�u�*�^�I�����o]}�����Y�?!]�2IUx�S�*l20�+s���}�Mu���ξ�g�CX�2;j옊⌨�tL5V��v�P��*�����Hc<����ka�"�Z0�:<(��C��,���X���3�`�]���1ڬ�O��^D��T��	8�iFa�H��i��Fxo,�[Q�ߌ��>�?��|�������8�Tst���n��{2���7��!!Lz���C���x��o����1]�+����8����ᛲ�'�,���4������������T��~@��g���{�<
�%=�'yz}�O���O��
}�_^�ON>9;8����}���Đ\�"=���xϋg_<��o���l�`F__���wpq�%��q�擢\���T�{N�)x���(x\�o��q�����	��<IC��&U5+?{�@���+�Ǉ�=<�7#s��^���<!����y��:�g��=E0���g�x��O�!�C�{x���Sx~�<��?��H}@�i���<NOI���Ӄ9/<���.e��&,�����`��MB6�� (R#���u� �a�Q��l"1��,����rjX� C��N!&X3��P��J��N3��A���p|g\&��xV_�Az=95�-��lu�R�b-;��)q�1I8�¡�F����Z�����61����
���a�A5���NX:�[�nRŠ'�V(
���1LjvG�1Ѓ�Z���{�2�F����0��҄��8@�v    ��(�!N�VF�ui�WF-ۥ�I�M�ؑd��z�pd�Y#
�����v.���L��y�s^Q6�\��b`�ǎ�):��W",*Q|Y����Xy�<n7#�$}^y�\{>4��OD�g�PDL�ƤgD--H���M���S�����r;h������.K=��bx�9��,���^�Տh�סq��§%a_
K1�F�x�y�U9��X�֜Rv�Aq�UuŚ1��G�Q�n�&�^�(�"�U���R����seW��L�N�3[D���a-���2�`sk�0�0��rR�iWD:�q��B�#��=1��K�$Ɣ�w�/�~o�b�'��F M�N-,����]���}}H,�3 ����l�rR���k^�&S%8.c'��'a�t�&��.�T�}� D0�T�y��5fʥe���у�W�KZ+�t�;�����@��3 ��뵏��Ml�P�^F5�
���F��f�u�f��}U-��P~� �� �z#���;��mQ���X�����\�*cc%���lt6��8�b̈́������c:�D�gֿ(�.��*�-9���9Ҕj���!�=�P���kx��Pce60�Y����P��`+hX���fD��a��D/c#�#Z����M,��l&��NK�K~��(�*��:�g�%t�T����cr��)��y�	�{g�b����0�X�2�<�����v�N�f4,Ɇ_�j��E~m�,��"֖�.�����{0��/M�<��F�!%,4k�Әn�9"2l��z΄�n�Q�-b��}Տ[(�����S�^��*�����b��e]��؁R���b�[�Pq PU�etyYD���p>3�h�˨��9A�UFzYQ��u�_�1�Ĭ�Yȁ�E�U����i@��A�x.�I=?L����^�T�.�7���w	���&���8=�%0���2'	P�$IT��e^�X�K��l�bB}16\��@x���s��o�񊀑؀�7�^#���7i�J�J��$��	~�+\��ﰅT_�-/+?�S{�-�Tc8��)�Z�D1��$\�+�?&wM#qH'�%l��ل�Ͽ�W��l@��kVT��٠_��;rb������73&�<%�㙨���\����S;f�Fu�.m@|�6�R��mJ��%q�L9>�#	築�i8�]��w�,�#��m\��"������ͮ.�캵�=oPa�΋؈�2Q���E���\Ş>Go�>!��՜z��>�����m��M1.��Y�Y�]��?����1h�z]�)���:�ͅ��Nj�T$)c�k�^
����<�Vx��
[S��<S�����S��2O�{B``�`�g������{�N���6'l��!U-��qe.8"�l�BH�;�ú*�֕�����ȫ^ 8�@�zB�L����.��L�g#�����ˮ���@�?���!"����`G+m�4�I��@Ɏ5��6�f
緶�H"3���.�
-���U��ԋ�B��J9UsҊ��W�n������k���YP�2�ɟL�,�r��gkmϢp����/���G_�"@�=��:�{�__�6�_IB��� b"���y�6�^��M~s����͍�x�(��Fg��j�������on~�?`�	�����$��-L\��?R�e��FlჄM�����$��������C0���W��m	���a�M���e+�K�o�?^ɥ'6	>��w�|����C�������_��k6q��۲�	������u���9"��aJ���|t|Ah�A�į�R�d�/FٔD��zXOV�p��K/?�I�籺���(!�K����UA�kg0�O!=�P_�V�/F[�l������Ě�q$����|f[��G]����@\�|��\��INR��̘��Ra��7��"���޽�O��>�� ,�ͧ�+	�>06$��<�L�?�=����KCk]��+H$��9��IR`A��(s Z���������PB@��=�as^~�l��4f�εɾ>濃� ��=ߴ?�_x��%��D��$ђ��'_�U��`�)]��{諀�Xu�5�3�M�gᵆ&>���� �i��N�� _@���a5�������j�r���kD�ЛỨ������?�!N�S99��y��V�T�5$G|�)GB���z��؞���t%�7��L�Ɛ�m��v�B�ȣ�_>�ǐ�Y7�{>��BTi�JD�����d]h�*��$��[�����I�l��[;���.�%��İh��E��<D
�B�	�iؙ|�Z�ݕ��Vc�U��U���z�/�	#.Q�i}�t�4(�[��z�L.J`a>�2�H���@�3�!�80a3k�s&��AU&�K�5�����N�:@�Y��#���[_Z���AS�4��A�!T�B��F��T��o�&�KY�*�c�ز|�.L��Z3�4^2� �y�,�9� O�<�D����rb�%��[C��h���r�+z�W���U�f�AMCu�2�Ք�H`��H�1@�_�W�ؾd�֘R#�]��u������Gޅ�_#۬��)��<�!�����q����`cw&I`IX���"�C����W� ]Ȉ	�|�(��#o�6w�˝D)�,	<��kum�ha�Dc1j3m��t�� �?�![��f�%�I��`w�e�>\@%��z·��SY��ǣQO²
N#N�&��:8��F$�D����3���Eo�"
.j5?|v@���IW��]��P3��}S�b{�9��pA1q]��`w@���HE�5�M��*5�h���r~p�%��Z�k~�d$r�t!�����'R+SN'L�Q��,0���r"6?�t	����[�[�FF�h�n����C�����>hT�#ͣ�S���!1�Ƞ?0�΂ڴ�a��y�9���ȋyw�ەa��ܲ��y�Q�A*"�����6��j�����E��~�s�=Ai��]<���A9�:����O��
��R��'=)!�)=�K����\�P�'���՝;��05��ޤ#���k��H������e���u ���'��K=͗g�]�oc��{�j�c����55$�9bmݖl:�E�q�-���CGAk�t�K�k�z��(�?���Y��A�x���o�폃�ȏ�5��5(�|�BUt�c=�isqc`p�����e͸����Ѷ�A;���^*�y_�����r�\9�P���Oϲ�Xw�7�����^��װʘHrOY�� o���G=%y�d���$b@J(+�=u�Uf
Z�L�X�!�/K��9ּ��J�~Lb�0ËJ�^����16;��B�bs��.�ofQg��(���&bEq=��E�lXH=I�b���޽Q��D5��Hh^�aD����d���eD�I�S��}q`R��v��3O��ҧ�d��fȚb+3h�J#�b�$�������օ�ո���q���-E�@�Nϐ�+��o�f�H	H/U�5�\�M��6TE������X�B�O�^\�_�Z��hsJ�5�鴡�i�L���qͦxV2�^JQ��c�0���k�?�[x1���I	�;+��ؗ���^�S�{)��˹_=����ӤrN f���X�rV݋|�1���%�����Cb�< ��t�ޕ����a�w�\�5,�1�IGB��4&m1���YTy���?�굟\�e�^!�7^L��r�p؛�jgi�84�63���(���	�&T)'R�hu�H��*d���4� m�M<%����P�\]:mX�A� ʙ� lW��ǂ	���V��gbA\�RSY�mkh���"�en6���!��Q�l l�z"�6Sw�8]�et��[[2�=C��lE�z�'�[ߛ��&��Ti�V�dMG����K�v��k��J1�y;>�)�d.��YPΫe�)RL�c�B�aKZ�e.m���z�ۛ1�i�X�
��I��,�����$�(-��:N��#��    8�⋅A�����zبV/>�dz�t�&LH����v�����Ҷ�X��ɳ��P	��g}��7jvGB����ar������p~�[�4�d�L&��"vE<�9="�����*9#*9�$����D��#�qC�*O�`��`�b<�9;68c�C�c�={pnx�Ր���4	U6�DI#��e����{��.��X�ː��'1X-#�����k��>`��<S4��0��L��Cy�M�H���Rc��Re+LL<M��(9�ƍ�P�U�&[�JE�z�#"�3�Rh�#���'ȏ�w���ж��J���a�^# ����V�hwi��)ޛ�a�0�ܾ��L˶O�V`��K4L~J;N�E����i�br��P����SJOo6���� i�7�pDx�r<��1T��n��I>�S\�gl,���Y�g�/�P,j0<=��e	������eL��ss#娹d��5-�K�k>��y��%�[<��qz��nT��F�J)Y��CD�˶���:I���SF�eF�#v�#�@�n-�B��YX�7J�I\A9DI%ˮ-f��˷F�=x�hIV(�m��/��bR����)k��uq���&�	M�!rʺ��b;���,v��E��8������7��"����U8D����õC;�2�9�15�@�X��"��#�\�/R�7�] ���c�7��[�ļN��"���q�5S�*GQ�)�(�<��Y�K�-3�"1����] q"u�MF.�12!���"u�U�e	�v�x.η�Ռ���k\����M+�W��P�ެ6�1�A)>��Є��(!�s��0�g�+w�ƾןƔ9�d�k�2+b��Ժa�`�� 5���;e�v��d�-H�2NA�ˁ�_:0�		������\kv�_��v1ќ\Ɓ@LZ��aRk�$!�!`�8앣ÓC����ƞ�����nn��*�Uf#�ז�+e ƈ"u�#+&���j�B��0r��m�����i�np�$�� ��R9g��T��j/�YP�8��f!,ar'�Do���S�$w"vY	#�0$-�7����9�\�Os`M�
[u&�z���Fʖ,\ҝ=��f�+�2!}K���*,������G�iEt[����3B�\�׮me�"v�R�e�\����� *����e������%a��K$K���w�篳�3fS����5���3̫56-r��Ã�n�攫6ι�o�S����xe����@����@�3v�x�Ŕ���f����5��Ǳ���Κ���e:�(814Ij���8�F��.�g�n!��#T���};�l��傱������;�7��=�g[���[}��%��q.Au�rMߐ�!�z���.,Fba[Z%|�抱�"��ʙΩ{��,�m90�'�V�(-{`\��K����3��Lx���o�O�����>�"7^�^��E]�ܞ�{��U��y�z=�9y�k&W�Y����V㗿�/��,�ӔQ���A�����iAEٯF[�UD�J�[Q9��wM��>b.UO<<y��q��0d/�-�G"��X�X��I M �U��{�r�Б�ѐ����9I���51���Ӑ��Oc��9��ɣ`�P�lT�xC3��$ٝ��jQ��N�j�0���6�1̡��!����q�U6��}�,VE�.��2ϲM�њ~����9E�\pވ�XS���
��i��3-Cx��y>dK��F�-~sv����-����0H,���Ӌ�[��
r>}<5�.��{r�fz�Dxq�ъ�$^8��q��vD�U�@x��&y�#�6<J"�����O�)��2�o~� �I��ǐ���/ؕ)��Ο�><8<R&03D&���̰�/v���+H���<������{O���~�c�/��t���B��:��-NVC�-�֖?�U�)��X��u����+�֊,l�_�p�^e��1B>1���3��(�nY��$�=蒺��z�-6a�N��ɾ����'/�k7�sae	-摕�GOV��m�ao��O� 6�4Pؒ�ߍ ���o�ab�X�Xw�!�i��4܎q� 	9�x��y����}#�KSJV� �l����>"�ʧ�����M�����-a�1.P�(A�W�\z���T3E�΋t�7gsԡow�UMM�S�{5YY8��v����w���W�����;���ѣ�ٙ۞���e��B��=��J
�����Ln��SȂQ/����%���,-�= ��ޙ���e	I��a,����KC��s�H_��]Ka��7�{@X�����^7�$��ypH�"�s���Ũ	`V�ˏY���U�!�3�P�k� q5󺆡T\��t�Pȶ��6^g���F�^��{-�6���O#�Q�x��*爃Т=|u��-k�_��s���n�+�^�3i��c᭣����$:�XiaSB �r��!�
x��H�wR�m#��ƺ�Zב��vE�n�6ˀLquI�������b.�|��/{^�vl3����4呔�Si�c��|���L�1��X��8�O�]))5"��.+:#y�!L�,�q�?�D۔�q�C��F�/h�ِ�zW�!�"���T088:?��.SD=u��+��i�%Wm��q��O�27 ?΍�F%��Z�wC��[bi�|�H=)h�<X#p�F9M{�Z}FO<�v��Ԋ&&K�=�~�,O��=:�Y'�]��L�xĬiU��K�J�-�G�)�ck/���Bi���ae�:�U�	`֦l7'�c+�5n�!,F�>���,�T[���8��ɮ��K8I�E�E��^�5u��Lj���>�/�|r��E����9�/�^�c�J������Su]�]B�	�1z��о;���-��*��zu�������@�S��GODm&.K��5p-1'��oWf�S>��]��!3��؏li0���E�n������f�ct� ,�:���q�ǁM�	���u w~ �Tng��<��<���(�9]������8{y��߻?�;?�v/�������<Q[�$����&��U
q9�E�x���<�#	l$�r��ҲSy�k�4�4["�����]0���*�'@�<x�j�5��5��m=J���g���Hk�&�G-R�(��֌�ž^ p�3�64��z2�4�B���rdق�o�,*�Y[�/�F�<�		S���U"��V�fʖB�����5�:�x%\��/�9�^ur[��h%&fj��e��Zm�n��M�ͪ�-�y���aw�E�	~��a��.G�,�UД6S�$��YY��%�&��n$�!궈���m���ɻ'�^i'ąb���Qg�9X��Qtg�h���`{Izg�$L4wg�y�D�h"mc��D�����`kC�`I�[�������`=8��yMZ�c�M[SEݶ��hENw�Y�e�`���%��C#Nը�ff8;��U	�%0�����h�6l�	%X��S	88���>�%Ѭ��x��n%nW/��6�}qd�a�L��iXM8j�d ʣ�Y�"��F`hȜ�&��s
]���$��93q�1l)觝5Rn2>X߾'wN�2�t�Q��Ϲ�hE���������D9��!x����r?��HC���`c�Oل��F��)�b���@����U|�z ���E���J�'�=RKNj��ڦ���nl���eH&750�)�YR08��u��j�����5�K�FbXW%��5�IԶ�!�4Ĺ��Q�� <��-~���H�B�'�Z�dX���z���UF�*N$Y_�q�M�C�̘��9~i$��M�h�bF�<H�֦F稱�>
��$_$�B�Ϳ1����Q;�\Syf�R��H�xoX�6=m�O�ZF��N��q��cr�����{�{Y�&�.Ū��lB����f���8c��x1mډ)�ٳ}7ħۗ��{ll�&7T2$�j���H�g7���2�Q�5֏����]�ɽ�ZK�Cer�tqcU╺.Hou-��$�|�2�����ћ���:L�^s���CS>]_��@l{ x4GrM�>b�"3 r��c雱��@Ź�    Raa��h`�5���mU��zF1�Fj4F�D.>+[}���k�9�'������m6*qO�M���>��?Z�F�-��I�+"�~Hi���@�(Jl��&+�U6�O�kI�*�M��jJ@��=q��+��ڜ����xC�m� b��{rͲ�Z�2��Z�Z� 5e�ڥ@n*�b0���Us�:`R� 9������L9���})��g��k-tHp��q��K���?l>a_�[kq�&1�O+噯�!����-��&)s�5h����E6�[4��,��e�缸B�hk�K�鉡��*ly�Wb�Ϻ>Z�H�>IJ�t��-�?x�.����������ؔx�ou�f�|9��S�\�K42b��R*������knOK�(0�q'G�W|�6��b��$5��Qq�j.�}z�����w
���K�i�i����~���q�}9��Ef�]ؐ�cv �9�!�^i���?7}��_��}��a��*+4c�q��ֽ�)+Ai�3@�_�O��5V���3�/2z3HK��RzF}:L�k�X�g��\�4	I�kv�����G����`@���4Y�ᾏ�{��x��YG���ă��l�.-l��� �y����!"$6+��PD$h��H�~n�)h�9�oչ/���,��5.�N�C��k-���"���0/�����n3�pA����u�=C�$����[�1;vʹR�y��0y���N|m�(3���#�"��S�)Χ�ll�L��k����`y٥�Z��W�^�(l���T��Lb��U�E?h��oy9x���+�˰yiǎg��.]�������|�\�͍̃��zc]Py�ɨ�����U2�+^��٢k��v�I"�t���G����sp��7�hS�8�1����/A��>^>��6�n�`Αl�s�K�%bϛ;� �a��
I�?Hl.NM��m�i"t�������M)?�~W�q���U�w��Y��zNnP�ǎ�T���$�Rg��7|��qu��g82w�us�NSh¸�Z-���t�"�Ob.W-�$s��M�۶A�U�TK>^C�5<�H�FRy�?i���02^��N�Ȧ�"�p�*��4���b	�!���k�����%�d�'�No�樅�{q����GX�|(�6����v���jZO�{��4�䗢�J}��VW���O��'�2mv����p睅pC	au}cŎ+=�R��1����<��&�	A��i���wa=X�l�v���6�?��o�?<#m��7�Y履\ ���?8_�~e���zW����g��YΤf�)�k2�Tr���h)���6���lwKeE�!`����ot���9���Huo8��ϒ��� ~�R1��a؅�	�<��!��S��П��\��OzT���4"���c�P�H���g�i�}wrqV�f�5�,�G\�"J���ƕ_����>펃�����wDq���y���z.�i�rS��R9ۺ���]��"4���z��WBb�cM׽y-�m�|����}��m�\e�Y~�'4l�����ZJT�`�2�Z��:J�f&��z�\Vϔ�k��5�u�ʐ#�H�#�ks�s��E���}~��@z���>�qg,4��!Bӎ�j��7� 5@'�_����L�ʹ���J2����S#��2�����Q�&��ypvxz���įP�u��	i{�Z=�L9HR �6��M��>)@�1����A8�=(��>�vl��A�3,-K��s�4$J/n
0[AlIʝ�{�/.���e|q��I8��h��������o>�G�>{v�����������(���������rz��x�������v�߼z��������W�?��_~�����/^%�Ͽ~�s�h����c��µ-���ˏ&�E��<�QY5�#s�YNWy���-BJ��'���ާ�ܽFwU�괳{���9�{O��(�s���(���_uv�ú��P�M˹�:���%��ը#7,�/�527:p��������H#��˫�}�]*��.	�V�����Z
4]�yG6�g$�G�O(
-��������?�>"��7�椹���:{��W�ί̢Mu��b���̭��w�t��r~�P���g.\A�/O:{����?��`�������Q��,�y�H˂��O�-xK�"�dRvv������:��_߳5��M��v)r[�DJ��6��V�4�]A���e� bbp�#v�d"����f=WWs{�a�j��j�)�}xSig�4���s�����C�D��'�VY�>S]�Reʭ�d_)vT)�K�����&X�0ےJ~!�4���	���m��<슫AsE�y" ��u�77viV�6��+�o��D�>}�� �����(	�J0��U!l�ٴ�N��7��݌�h_�Q�rx�ժ�����4wn�� T��y,���b3L���
�7;��	�5�-pk�(��(��(H�K��|^�<d �=�Fܳ��1כ	�HeZ�o������`i�qX|?IRǛ�*E[w��M�(��R�m���k��ٯ���6���y;G��F�����}����d�{Q�������v�ص�{G���F��w����Xh�ڻ����� �����{�'af^���e�[r��l$��!|?(������{t�gu��"��L:��W���0�#��oɽ�Sq؝�{����~f����R�L��.��3��� W����ڭ��Y�?�J�rS�$O��U[�tEJ���<�Q���a���닼��������G��O|�`c}c�xQ�8�	(#I���
f�$B��0�Ph�6��´���-Ņm-���3I}��\v �q�Y�g^��7�lq��DI4d[�m̵2��QOa�^�~������񶥖��Ҍ+�WAk�;^E`��ƹ]�u�8l�,�]�j�#�K���_F�Z�������a�w�8gL���*���D�����&h�AwC�CZH����w6��.,�O֌
~���Ss�5�����(�ȍ�~)A��T4�� @5!�͈�&��=p�齡���ʈH�y�:�$ʢ�8[�����%ن����Juc13ِ߉�wR�n�	���0��j9��4�%�Y�U#��ǆ?n�F��^����#�4"!�-!�Ǧ��`��1�Di�G��J�юV+����jS�#��^S­g�K/�� U�ϛ:��d{���ͤ��Ѕ[
5�HG8��xF�l
�8yg�����﮼<����Xl,���+H4Ʃ���h��
�(��lZ��T�COL��_��I�m��"�⎄��� ���U�=��]Z�󺸍��m��j<��i�^�Db�5#ɵ�e��.�Lj�s�?��Mw����ȭ�����>{��Lc��Õ1�΍N�\Zs�47{�1$3#K��̄�\�C+2����%e��n���56^&�XjK�oʹ��e2򽖛
���n���H��Jh̟�2[o?���~V����N��4���`����s�"M�o��Y�\d�b1B7A����.�fe�1�'��J��{�(W�O,��Rv`�ڃ�H��
R����>����z��4��b��s�I����ju��q��{v4 		D�����\=bE:�M��oy�YXL�,��O�|aϖ�]U\�;�ei�!-	*t�eU�|�pP��q�)j����n(���4�%,;� �2�X�$����X\�VWXF\a����[�p�c�˹B�$(��`�$��l��n��F�,�z�UE�J�ֵ���\_����/7��|�[�?\����w�lv�����hY�q�w��{w�ݟ�S07@��_��`��4�|��GW�0�G�BQ�W̰�R{�Q��D-5є����2��x��T���a�[*��'�.m�]�^�'f��;(1���,��O��_������}��i��$�N��L�s�
<d�	Qz����֬��Qy���T;T�:��5�B�a��� ��(�F��:ݍ�.�<�Շ�*N����ZМQ�fG���e*q�$�+�D�3H��&�a�ҡ�(����E+�Qd�:Am2���Q�^L�������E׈�٘����f���� H  �+6����>X���cXR+�CM��l����AУ�;L��\����{�ͷ���럺���@�G�4	��CM~sF���1�U�� ��2㪟^?`�����g=�T�w!��,F�����gk�b'LE��r�'L��V�yK<q��,�v��[t���z�]gT`��]��V�5Uj�W�����4�<�eK�8B$U�Vd?v�US�G0��F�����Y���uj��(����L���	�ě��B������<\��4�G#���o�毙?�\�iv-.�d��� �/j��0<�PH��\�D
�r�,,�:]���kM��ֺ)h/�ٿj���;�{���`p����l�5H�ی�������,�M�S_f3�ɹu>�Ö�%fҢ]7*��oa��� +8�RLW��a��4"5B$��5��X*��<ǃY�3�61�]�7����	�o�|3n��B��Ty�FU7��kf����1��UO������v/P�(�&G9<U��gI,����`
3GTMaS��ӓ)c�厴���A�E	��� g�PV�T	��0�{#���3Y?�|�f7'%㦳�Vr�.ӣ�"�"�����iN�`���\2�\�K�[׍+����-ڏ�MUk��� {�;�X��&-��%��u���g�CJS5���K�kP�9����W�|��A��O���{5Ӣq֓Z[�U5G*�-���Kr}�t��+�'�t�}i��^\	��P.��ɳ�g��'�٦߄��+�y�m���,*�19�N��`��5lq[3^��J��#�h2�ύ��P"��*����i�a�kY-:דG�A�m��|L�ަΥG��G�x�307���.������4p��R�����`�y^D� ����H1���Ө"
���QE(DA�̌���;Jct����4lZv_g�+�|?��4�%����q��$Wg5��<��V��ۜT�1��E�������(�`���4��)���Ms/�Q@cW�eJ@�U9���ґӉ`8���n�?��V��㿁��X=A˄P��=�d�4º��ߥB"��%��?W����t�6�kW      %      x������ � �      '      x������ � �      (   @  x��V�n�6}��B?�o�屻-� @l�>�qm�m9��.��rihA 	��3gnTLb}����{�_��0�˿C�
�t�ԭ$�~S��Oq��9�06� �0%��_e�+*5ٞY1�>/ǥ}
c�L��٭��=��l|v��_�~��k���8������+��c�ډ��	�9������0&��/�i��F&�4�utR!ZG'5���CT��5�n�v	��"�Q��P���ؽ�ױ��$J_� �Wă��c�4�Fh�k�Z�?���ڈYq�	*�}�?��� iI[��=�1�J�5�c���a��6<�_�>�X�*�cU�ʌpxt3U���q8��F�d�5[�O`�	��`����t4^�	$֟ܮ����/�$�*i������x��vy����x��j��0�D=��s�	ɢ�%Ɏ��8C��1	,��$�W�<�q���؞㸴 X�-jN���4�~uL�kP�V$���p�����p���j�)A�.��f+�Ux	UhZ��ȷY(-����)�?�h����q����C�[�#pvݦ�NB��F%�q����2,�#�dJ��'��
|3<�ϊX2���e;�uTi���T�:��5%��b8@*���Vy
+]y��hWu��5��� j�l�"����!��`�g�T`�y�> �`ȵ(�=��KHqB���iM�`�Nw�y��hݦ��)*�Jg��$f��U�k��q�+�q��-��2,�H�}RܵЧ����d�ݢ</fǌ���s�V�:��
~�ȋW�㶮i]j�^���ވ��^��Exe����c�ٞu���aS�����Խ��~��<1̨���+���]���
_��������5������]�U���y�t�����Ϧ�׍-�3IT~"_���f���|]p����T|40���%���e��c80UYw��;�H�m
~Ӈ�m}p�J�����Ҕ���Pe~A&����p�o�.�_�����3+����P�y������6=�6=��ީr��î�)A��U���0^�Gb���1�M35�>5M�?F�+      *      x������ � �      ,   �   x��н
�@��9y
�@��v�;���%֓
zB���7G)���%��\B��V�M���Ϸ�1��#�܎�����
��&g+�Q�D/JtI�$<H0�C<A�������9���	,ӡf4���`�:#�9B/�Ң/��,;Ħ$xN~����H���{Y�6kD|�o�      -   =   x�3�����Sp�H,I�/�LIMK,�)�4�2�t�Q�q���p���CB�\1z\\\ �o%      /      x������ � �      2   �  x���[��H���W�ЯG�
ʧFA�`:��r��]����9�>��t�n�+�J���
S����P�,#2�ȕ$)�]�Z�Ñ���7����/|�U:�E6�tՙ\�Z�F{e�p�����
��a�������~B ���� Bo�{���)S�{����B�x�e���S�k ��M��"PH.X�C�c�h��11��y���� J'nX*�~�/�5HH�.Y�	kgPUY/�E��\�󇷟m��>G�KtU��*݊����ʃ_�	M;E��Z�^"��|��;��g962�m���)%m�*�U�FWdur4� ��,�J�d��SҒ��zi�S�d��2��a����Z�׃k�<�M
�Kj⋝u��>��u���o~
�)@/�C�N.VUt�)X��M#C'GK�j�r�
�m��s�7kl.�MY�z�K����$	)�ꕸ��~�à.�����|�|���}ӌ���xl��l��{:z���mf�P�������x�;�ɰg��Z�FkՑ$sٕm�+�lUE��T;�*w�uv-'���s�$rDb�gs J�s�eT�eA��׎\�����'.:</eY�	;^f�瑮���ɂ�|����S����4#�9c���r�o�"4��)���������[�u�.K<zi�w��e��� W*�Mq�6�=��ㄩ<l��(����u<�����˗ֱA��mތ�OƇ熷�����3/�W�⨊�g���.��<�3�	����}�@��w����'m2E���);4Pyr����.9�w_�7ѳ;5�$6T%U�Ԗ��f����g7┾y@HiY�4AnYtQ���\���%�$N%�p'��ea7r��\��`��m��hˉ������%�����f?��QS��H��_��X��(.���z�۩��xh�.�U{��n���t̟^is�Q�;Q}�j�t�A�¿:���Ia{fg��l��*-�}�,�V�k��7̓�Wk�?��Ff�8��/��S������N�_M妀��N�!g��,����6���Q������1]�WV�O�9�Z`�ip���Vk]@�Z�*��/If�a�6(�3��L�[ϙ:����<_��X�s��l!�W��y�� �_�����Li�_��g��s72� |�?�r[=�G�VLmk�5�`�N9��)�ͅh�m4��/>�      4      x������ � �      6   �   x���=�0�g�\��v�&�``�b��'C��'U�"PD$��{���	X��M�G?� 1;j���t�	��X��C��F抨B�"�H�\Q+���{=�3IG3��n��`�m+�K�&��8Д���f����X�LQ\Q+F�z������ �j�T��gQ��[c^pnn�     
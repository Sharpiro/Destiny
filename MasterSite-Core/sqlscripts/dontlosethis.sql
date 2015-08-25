USE [master]
GO
/****** Object:  Database [PokeDB]    Script Date: 8/24/2015 10:55:34 PM ******/
CREATE DATABASE [PokeDB]
GO
ALTER DATABASE [PokeDB] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PokeDB].[dbo].[sp_fulltext_database] @action = 'disable'
end
GO
ALTER DATABASE [PokeDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PokeDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PokeDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PokeDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PokeDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [PokeDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PokeDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PokeDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PokeDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PokeDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PokeDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PokeDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PokeDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PokeDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PokeDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [PokeDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PokeDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PokeDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PokeDB] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [PokeDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PokeDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [PokeDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PokeDB] SET RECOVERY FULL 
GO
ALTER DATABASE [PokeDB] SET  MULTI_USER 
GO
ALTER DATABASE [PokeDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PokeDB] SET DB_CHAINING OFF 
GO
USE [PokeDB]
GO
/****** Object:  User [jake]    Script Date: 8/24/2015 10:55:34 PM ******/
CREATE USER [jake] FOR LOGIN [jake] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [jake]
GO
/****** Object:  Table [dbo].[Level]    Script Date: 8/24/2015 10:55:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Level](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[Moves]    Script Date: 8/24/2015 10:55:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Moves](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Type] [nvarchar](15) NULL,
	[Category] [nvarchar](20) NULL,
	[Power] [int] NULL,
	[Accuracy] [int] NULL,
	[PowerPoints] [int] NULL,
	[TechnicalMachine] [nvarchar](10) NULL,
	[Effect] [nvarchar](255) NULL,
	[Probability] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[Pokemon]    Script Date: 8/24/2015 10:55:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pokemon](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[PokemonMoves]    Script Date: 8/24/2015 10:55:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PokemonMoves](
	[PokemonId] [int] NOT NULL,
	[MovesId] [int] NOT NULL,
	[Level] [int] NULL,
 CONSTRAINT [PK_PokemonMoves] PRIMARY KEY CLUSTERED 
(
	[PokemonId] ASC,
	[MovesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[Signs]    Script Date: 8/24/2015 10:55:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Signs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](max) NULL,
	[LevelId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
SET IDENTITY_INSERT [dbo].[Level] ON 

INSERT [dbo].[Level] ([Id], [Name]) VALUES (1, N'Level 1')
INSERT [dbo].[Level] ([Id], [Name]) VALUES (2, N'Level 2')
SET IDENTITY_INSERT [dbo].[Level] OFF
SET IDENTITY_INSERT [dbo].[Moves] ON 

INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (3, N'Absorb', N'GRASS', N'Special', 20, 100, 25, NULL, N'User recovers half the HP inflicted on opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (4, N'Acid', N'POISON', N'Special', 40, 100, 30, NULL, N'May lower opponents Special Defense.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (5, N'Acid Armor', N'POISON', N'Status', NULL, NULL, 20, NULL, N'Sharply raises users Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (6, N'Acid Spray', N'POISON', N'Special', 40, 100, 20, NULL, N'Sharply lowers opponents Special Defense.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (7, N'Acrobatics', N'FLYING', N'Physical', 55, 100, 15, N'TM62', N'Stronger when the user does not have a held item.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (8, N'Acupressure', N'NORMAL', N'Status', NULL, NULL, 30, NULL, N'Sharply raises a random stat.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (9, N'Aerial Ace', N'FLYING', N'Physical', 60, -1, 20, N'TM40', N'Ignores Accuracy and Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (10, N'Aeroblast', N'FLYING', N'Special', 100, 95, 5, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (11, N'After You', N'NORMAL', N'Status', NULL, NULL, 15, NULL, N'Gives target priority in the next turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (12, N'Agility', N'PSYCHIC', N'Status', NULL, NULL, 30, NULL, N'Sharply raises users Speed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (13, N'Air Cutter', N'FLYING', N'Special', 60, 95, 25, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (14, N'Air Slash', N'FLYING', N'Special', 75, 95, 20, NULL, N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (15, N'Ally Switch', N'PSYCHIC', N'Status', NULL, NULL, 15, NULL, N'User switches with opposite teammate.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (16, N'Amnesia', N'PSYCHIC', N'Status', NULL, NULL, 20, NULL, N'Sharply raises users Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (17, N'Ancient Power', N'ROCK', N'Special', 60, 100, 5, NULL, N'May raise all users stats at once.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (18, N'Aqua Jet', N'WATER', N'Physical', 40, 100, 20, NULL, N'User attacks first.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (19, N'Aqua Ring', N'WATER', N'Status', NULL, NULL, 20, NULL, N'Restores a little HP each turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (20, N'Aqua Tail', N'WATER', N'Physical', 90, 90, 10, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (21, N'Arm Thrust', N'FIGHTING', N'Physical', 15, 100, 20, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (22, N'Aromatherapy', N'GRASS', N'Status', NULL, NULL, 5, NULL, N'Cures all status problems in your party.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (23, N'Aromatic Mist', N'FAIRY', N'Status', NULL, 100, 20, NULL, N'Raises Special Defense of allies.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (24, N'Assist', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'In a Double Battle, user randomly attacks with a partners move.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (25, N'Assurance', N'DARK', N'Physical', 60, 100, 10, NULL, N'Power doubles if opponent already took damage in the same turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (26, N'Astonish', N'GHOST', N'Physical', 30, 100, 15, NULL, N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (27, N'Attack Order', N'BUG', N'Physical', 90, 100, 15, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (28, N'Attract', N'NORMAL', N'Status', NULL, 100, 15, N'TM45', N'If opponent is the opposite gender, its less likely to attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (29, N'Aura Sphere', N'FIGHTING', N'Special', 80, -1, 20, NULL, N'Ignores Accuracy and Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (30, N'Aurora Beam', N'ICE', N'Special', 65, 100, 20, NULL, N'May lower opponents Attack.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (31, N'Autotomize', N'STEEL', N'Status', NULL, NULL, 15, NULL, N'Halves weight and sharply raises Speed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (32, N'Avalanche', N'ICE', N'Physical', 60, 100, 10, NULL, N'Power doubles if user took damage first.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (33, N'Baby-Doll Eyes', N'FAIRY', N'Status', NULL, 100, 30, NULL, N'Always goes first. Lowers the targets attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (34, N'Barrage', N'NORMAL', N'Physical', 15, 85, 20, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (35, N'Barrier', N'PSYCHIC', N'Status', NULL, NULL, 20, NULL, N'Sharply raises users Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (36, N'Baton Pass', N'NORMAL', N'Status', NULL, NULL, 40, NULL, N'User switches out and gives stat changes to the incoming Pokémon.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (37, N'Beat Up', N'DARK', N'Physical', NULL, 100, 30, NULL, N'Each Pokémon in your party attacks.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (38, N'Belch', N'POISON', N'Special', 120, 90, 10, NULL, N'Requires a held Berry to attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (39, N'Belly Drum', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'User loses 50% of its max HP, but Attack raises to maximum.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (40, N'Bestow', N'NORMAL', N'Status', NULL, NULL, 15, NULL, N'Gives the users held item to the target.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (41, N'Bide', N'NORMAL', N'Physical', NULL, NULL, 10, NULL, N'User takes damage for two turns then strikes back double.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (42, N'Bind', N'NORMAL', N'Physical', 15, 85, 20, NULL, N'Traps opponent, damaging them for 4-5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (43, N'Bite', N'DARK', N'Physical', 60, 100, 25, NULL, N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (44, N'Blast Burn', N'FIRE', N'Special', 150, 90, 5, NULL, N'User must recharge next turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (45, N'Blaze Kick', N'FIRE', N'Physical', 85, 90, 10, NULL, N'High critical hit ratio. May burn opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (46, N'Blizzard', N'ICE', N'Special', 110, 70, 5, N'TM14', N'May freeze opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (47, N'Block', N'NORMAL', N'Status', NULL, NULL, 5, NULL, N'Opponent cannot flee or switch.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (48, N'Blue Flare', N'FIRE', N'Special', 130, 85, 5, NULL, N'May burn opponent.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (49, N'Body Slam', N'NORMAL', N'Physical', 85, 100, 15, NULL, N'May paralyze opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (50, N'Bolt Strike', N'ELECTRIC', N'Physical', 130, 85, 5, NULL, N'May paralyze opponent.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (51, N'Bone Club', N'GROUND', N'Physical', 65, 85, 20, NULL, N'May cause flinching.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (52, N'Bone Rush', N'GROUND', N'Physical', 25, 90, 10, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (53, N'Bonemerang', N'GROUND', N'Physical', 50, 90, 10, NULL, N'Hits twice in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (54, N'Boomburst', N'NORMAL', N'Special', 140, 100, 10, NULL, N'Hits all adjacent Pokémon.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (55, N'Bounce', N'FLYING', N'Physical', 85, 85, 5, NULL, N'Springs up on first turn, attacks on second. May paralyze opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (56, N'Brave Bird', N'FLYING', N'Physical', 120, 100, 15, NULL, N'User receives recoil damage.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (57, N'Brick Break', N'FIGHTING', N'Physical', 75, 100, 15, N'TM31', N'Breaks through Reflect and Light Screen barriers.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (58, N'Brine', N'WATER', N'Special', 65, 100, 10, NULL, N'Power doubles if opponents HP is less than 50%.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (59, N'Bubble', N'WATER', N'Special', 40, 100, 30, NULL, N'May lower opponents Speed.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (60, N'Bubble Beam', N'WATER', N'Special', 65, 100, 20, NULL, N'May lower opponents Speed.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (61, N'Bug Bite', N'BUG', N'Physical', 60, 100, 20, NULL, N'Receives the effect from the opponents held berry.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (62, N'Bug Buzz', N'BUG', N'Special', 90, 100, 10, NULL, N'May lower opponents Special Defense.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (63, N'Bulk Up', N'FIGHTING', N'Status', NULL, NULL, 20, N'TM08', N'Raises users Attack and Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (64, N'Bulldoze', N'GROUND', N'Physical', 60, 100, 20, N'TM78', N'Lowers opponents Speed.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (65, N'Bullet Punch', N'STEEL', N'Physical', 40, 100, 30, NULL, N'User attacks first.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (66, N'Bullet Seed', N'GRASS', N'Physical', 25, 100, 30, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (67, N'Calm Mind', N'PSYCHIC', N'Status', NULL, NULL, 20, N'TM04', N'Raises users Special Attack and Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (68, N'Camouflage', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'Changes users type according to the location.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (69, N'Captivate', N'NORMAL', N'Status', NULL, 100, 20, NULL, N'Sharply lowers opponents Special Attack if opposite gender.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (70, N'Celebrate', N'NORMAL', N'Status', NULL, NULL, 40, NULL, N'The Pokémon congratulates you on your special day. No battle effect.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (71, N'Charge', N'ELECTRIC', N'Status', NULL, NULL, 20, NULL, N'Raises users Special Defense and next Electric moves power increases.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (72, N'Charge Beam', N'ELECTRIC', N'Special', 50, 90, 10, N'TM57', N'May raise users Special Attack.', 70)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (73, N'Charm', N'FAIRY', N'Status', NULL, 100, 20, NULL, N'Sharply lowers opponents Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (74, N'Chatter', N'FLYING', N'Special', 65, 100, 20, NULL, N'Confuses opponent.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (75, N'Chip Away', N'NORMAL', N'Physical', 70, 100, 20, NULL, N'Ignores opponents stat changes.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (76, N'Circle Throw', N'FIGHTING', N'Physical', 60, 90, 10, NULL, N'In battles, the opponent switches. In the wild, the Pokémon runs.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (77, N'Clamp', N'WATER', N'Physical', 35, 85, 10, NULL, N'Traps opponent, damaging them for 4-5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (78, N'Clear Smog', N'POISON', N'Special', 50, NULL, 15, NULL, N'Removes all of the targets stat changes.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (79, N'Close Combat', N'FIGHTING', N'Physical', 120, 100, 5, NULL, N'Lowers users Defense and Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (80, N'Coil', N'POISON', N'Status', NULL, NULL, 20, NULL, N'Raises users Attack, Defense and Accuracy.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (81, N'Comet Punch', N'NORMAL', N'Physical', 18, 85, 15, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (82, N'Confide', N'NORMAL', N'Status', NULL, NULL, 20, N'TM100', N'Lowers opponents Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (83, N'Confuse Ray', N'GHOST', N'Status', NULL, 100, 10, NULL, N'Confuses opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (84, N'Confusion', N'PSYCHIC', N'Special', 50, 100, 25, NULL, N'May confuse opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (85, N'Constrict', N'NORMAL', N'Physical', 10, 100, 35, NULL, N'May lower opponents Speed by one stage.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (86, N'Conversion', N'NORMAL', N'Status', NULL, NULL, 30, NULL, N'Changes users type to that of its first move.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (87, N'Conversion 2', N'NORMAL', N'Status', NULL, NULL, 30, NULL, N'User changes type to become resistant to opponents last move.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (88, N'Copycat', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'Copies opponents last move.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (89, N'Cosmic Power', N'PSYCHIC', N'Status', NULL, NULL, 20, NULL, N'Raises users Defense and Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (90, N'Cotton Guard', N'GRASS', N'Status', NULL, NULL, 10, NULL, N'Drastically raises users Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (91, N'Cotton Spore', N'GRASS', N'Status', NULL, 100, 40, NULL, N'Sharply lowers opponents Speed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (92, N'Counter', N'FIGHTING', N'Physical', NULL, 100, 20, NULL, N'When hit by a Physical Attack, user strikes back with 2x power.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (93, N'Covet', N'NORMAL', N'Physical', 60, 100, 25, NULL, N'Opponents item is stolen by the user.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (94, N'Crabhammer', N'WATER', N'Physical', 100, 90, 10, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (95, N'Crafty Shield', N'FAIRY', N'Status', NULL, NULL, 10, NULL, N'Protects the Pokémon from status moves.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (96, N'Cross Chop', N'FIGHTING', N'Physical', 100, 80, 5, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (97, N'Cross Poison', N'POISON', N'Physical', 70, 100, 20, NULL, N'High critical hit ratio. May poison opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (98, N'Crunch', N'DARK', N'Physical', 80, 100, 15, NULL, N'May lower opponents Defense.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (99, N'Crush Claw', N'NORMAL', N'Physical', 75, 95, 10, NULL, N'May lower opponents Defense.', 50)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (100, N'Crush Grip', N'NORMAL', N'Physical', NULL, 100, 5, NULL, N'More powerful when opponent has higher HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (101, N'Curse', N'GHOST', N'Status', NULL, NULL, 10, NULL, N'Ghosts lose 50% of max HP and curse the opponent; Non-Ghosts raise Attack, Defense and lower Speed.', NULL)
GO
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (102, N'Cut', N'NORMAL', N'Physical', 50, 95, 30, N'HM01', NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (103, N'Dark Pulse', N'DARK', N'Special', 80, 100, 15, N'TM97', N'May cause flinching.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (104, N'Dark Void', N'DARK', N'Status', NULL, 80, 10, NULL, N'Puts all adjacent opponents to sleep.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (105, N'Dazzling Gleam', N'FAIRY', N'Special', 80, 100, 10, N'TM99', N'Hits all adjacent opponents.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (106, N'Defend Order', N'BUG', N'Status', NULL, NULL, 10, NULL, N'Raises users Defense and Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (107, N'Defense Curl', N'NORMAL', N'Status', NULL, NULL, 40, NULL, N'Raises users Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (108, N'Defog', N'FLYING', N'Status', NULL, NULL, 15, NULL, N'Lowers opponents Evasiveness and clears fog.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (109, N'Destiny Bond', N'GHOST', N'Status', NULL, NULL, 5, NULL, N'If the user faints, the opponent also faints.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (110, N'Detect', N'FIGHTING', N'Status', NULL, NULL, 5, NULL, N'Opponents attack doesnt affect you, but may fail if used often.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (111, N'Diamond Storm', N'ROCK', N'Physical', 100, 95, 5, NULL, N'May raise users Defense', 50)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (112, N'Dig', N'GROUND', N'Physical', 80, 100, 10, N'TM28', N'Digs underground on first turn, attacks on second. Can also escape from caves.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (113, N'Disable', N'NORMAL', N'Status', NULL, 100, 20, NULL, N'Opponent cant use its last attack for a few turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (114, N'Disarming Voice', N'FAIRY', N'Special', 40, -1, 15, NULL, N'Ignores Accuracy and Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (115, N'Discharge', N'ELECTRIC', N'Special', 80, 100, 15, NULL, N'May paralyze opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (116, N'Dive', N'WATER', N'Physical', 80, 100, 10, N'HM07', N'Dives underwater on first turn, attacks on second turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (117, N'Dizzy Punch', N'NORMAL', N'Physical', 70, 100, 10, NULL, N'May confuse opponent.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (118, N'Doom Desire', N'STEEL', N'Special', 140, 100, 5, NULL, N'Damage occurs 2 turns later.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (119, N'Double Hit', N'NORMAL', N'Physical', 35, 90, 10, NULL, N'Hits twice in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (120, N'Double Kick', N'FIGHTING', N'Physical', 30, 100, 30, NULL, N'Hits twice in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (121, N'Double Slap', N'NORMAL', N'Physical', 15, 85, 10, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (122, N'Double Team', N'NORMAL', N'Status', NULL, NULL, 15, N'TM32', N'Raises users Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (123, N'Double Edge', N'NORMAL', N'Physical', 120, 100, 15, NULL, N'User receives recoil damage.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (124, N'Draco Meteor', N'DRAGON', N'Special', 130, 90, 5, NULL, N'Sharply lowers users Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (125, N'Dragon Ascent', N'FLYING', N'Physical', 120, 100, 5, NULL, N'Lowers users Defense and Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (126, N'Dragon Breath', N'DRAGON', N'Special', 60, 100, 20, NULL, N'May paralyze opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (127, N'Dragon Claw', N'DRAGON', N'Physical', 80, 100, 15, N'TM02', NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (128, N'Dragon Dance', N'DRAGON', N'Status', NULL, NULL, 20, NULL, N'Raises users Attack and Speed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (129, N'Dragon Pulse', N'DRAGON', N'Special', 85, 100, 10, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (130, N'Dragon Rage', N'DRAGON', N'Special', NULL, 100, 10, NULL, N'Always inflicts 40 HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (131, N'Dragon Rush', N'DRAGON', N'Physical', 100, 75, 10, NULL, N'May cause flinching.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (132, N'Dragon Tail', N'DRAGON', N'Physical', 60, 90, 10, N'TM82', N'In battles, the opponent switches. In the wild, the Pokémon runs.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (133, N'Drain Punch', N'FIGHTING', N'Physical', 75, 100, 10, NULL, N'User recovers half the HP inflicted on opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (134, N'Draining Kiss', N'FAIRY', N'Special', 50, 100, 10, NULL, N'User recovers most the HP inflicted on opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (135, N'Dream Eater', N'PSYCHIC', N'Special', 100, 100, 15, N'TM85', N'User recovers half the HP inflicted on a sleeping opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (136, N'Drill Peck', N'FLYING', N'Physical', 80, 100, 20, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (137, N'Drill Run', N'GROUND', N'Physical', 80, 95, 10, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (138, N'Dual Chop', N'DRAGON', N'Physical', 40, 90, 15, NULL, N'Hits twice in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (139, N'Dynamic Punch', N'FIGHTING', N'Physical', 100, 50, 5, NULL, N'Confuses opponent.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (140, N'Earth Power', N'GROUND', N'Special', 90, 100, 10, NULL, N'May lower opponents Special Defense.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (141, N'Earthquake', N'GROUND', N'Physical', 100, 100, 10, N'TM26', N'Power is doubled if opponent is underground from using Dig.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (142, N'Echoed Voice', N'NORMAL', N'Special', 40, 100, 15, N'TM49', N'Power increases each turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (143, N'Eerie Impulse', N'ELECTRIC', N'Status', NULL, 100, 15, NULL, N'Sharply lowers opponents Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (144, N'Egg Bomb', N'NORMAL', N'Physical', 100, 75, 10, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (145, N'Electric Terrain', N'ELECTRIC', N'Status', NULL, NULL, 10, NULL, N'Prevents all Pokémon from falling asleep for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (146, N'Electrify', N'ELECTRIC', N'Status', NULL, NULL, 20, NULL, N'Changes the targets move to Electric type.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (147, N'Electro Ball', N'ELECTRIC', N'Special', NULL, 100, 10, NULL, N'The faster the user, the stronger the attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (148, N'Electroweb', N'ELECTRIC', N'Special', 55, 95, 15, NULL, N'Lowers opponents Speed.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (149, N'Embargo', N'DARK', N'Status', NULL, 100, 15, N'TM63', N'Opponent cannot use items.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (150, N'Ember', N'FIRE', N'Special', 40, 100, 25, NULL, N'May burn opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (151, N'Encore', N'NORMAL', N'Status', NULL, 100, 5, NULL, N'Forces opponent to keep using its last move for 3 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (152, N'Endeavor', N'NORMAL', N'Physical', NULL, 100, 5, NULL, N'Reduces opponents HP to same as users.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (153, N'Endure', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'Always left with at least 1 HP, but may fail if used consecutively.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (154, N'Energy Ball', N'GRASS', N'Special', 90, 100, 10, N'TM53', N'May lower opponents Special Defense.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (155, N'Entrainment', N'NORMAL', N'Status', NULL, 100, 15, NULL, N'Makes targets ability same as users.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (156, N'Eruption', N'FIRE', N'Special', 150, 100, 5, NULL, N'Stronger when the users HP is higher.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (157, N'Explosion', N'NORMAL', N'Physical', 250, 100, 5, N'TM64', N'User faints.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (158, N'Extrasensory', N'PSYCHIC', N'Special', 80, 100, 20, NULL, N'May cause flinching.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (159, N'Extreme Speed', N'NORMAL', N'Physical', 80, 100, 5, NULL, N'User attacks first.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (160, N'Facade', N'NORMAL', N'Physical', 70, 100, 20, N'TM42', N'Power doubles if user is burned, poisoned, or paralyzed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (161, N'Fairy Lock', N'FAIRY', N'Status', NULL, NULL, 10, NULL, N'Prevents fleeing in the next turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (162, N'Fairy Wind', N'FAIRY', N'Special', 40, 100, 30, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (163, N'Fake Out', N'NORMAL', N'Physical', 40, 100, 10, NULL, N'User attacks first, foe flinches. Only usable on first turn.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (164, N'Fake Tears', N'DARK', N'Status', NULL, 100, 20, NULL, N'Sharply lowers opponents Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (165, N'False Swipe', N'NORMAL', N'Physical', 40, 100, 40, N'TM54', N'Always leaves opponent with at least 1 HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (166, N'Feather Dance', N'FLYING', N'Status', NULL, 100, 15, NULL, N'Sharply lowers opponents Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (167, N'Feint', N'NORMAL', N'Physical', 30, 100, 10, NULL, N'Only hits if opponent uses Protect or Detect in the same turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (168, N'Feint Attack', N'DARK', N'Physical', 60, -1, 20, NULL, N'Ignores Accuracy and Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (169, N'Fell Stinger', N'BUG', N'Physical', 30, 100, 25, NULL, N'Sharply raises users Attack if target is KOd.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (170, N'Fiery Dance', N'FIRE', N'Special', 80, 100, 10, NULL, N'May raise users Special Attack.', 50)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (171, N'Final Gambit', N'FIGHTING', N'Special', NULL, 100, 5, NULL, N'Inflicts damage equal to the users remaining HP. User faints.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (172, N'Fire Blast', N'FIRE', N'Special', 110, 85, 5, N'TM38', N'May burn opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (173, N'Fire Fang', N'FIRE', N'Physical', 65, 95, 15, NULL, N'May cause flinching and/or burn opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (174, N'Fire Pledge', N'FIRE', N'Special', 80, 100, 10, NULL, N'Added effects appear if combined with Grass Pledge or Water Pledge.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (175, N'Fire Punch', N'FIRE', N'Physical', 75, 100, 15, NULL, N'May burn opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (176, N'Fire Spin', N'FIRE', N'Special', 35, 85, 15, NULL, N'Traps opponent, damaging them for 4-5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (177, N'Fissure', N'GROUND', N'Physical', NULL, NULL, 5, NULL, N'One-Hit-KO, if it hits.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (178, N'Flail', N'NORMAL', N'Physical', NULL, 100, 15, NULL, N'The lower the users HP, the higher the power.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (179, N'Flame Burst', N'FIRE', N'Special', 70, 100, 15, NULL, N'May also injure nearby Pokémon.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (180, N'Flame Charge', N'FIRE', N'Physical', 50, 100, 20, N'TM43', N'Raises users Speed.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (181, N'Flame Wheel', N'FIRE', N'Physical', 60, 100, 25, NULL, N'May burn opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (182, N'Flamethrower', N'FIRE', N'Special', 90, 100, 15, N'TM35', N'May burn opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (183, N'Flare Blitz', N'FIRE', N'Physical', 120, 100, 15, NULL, N'User receives recoil damage. May burn opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (184, N'Flash', N'NORMAL', N'Status', NULL, 100, 20, N'TM70', N'Lowers opponents Accuracy.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (185, N'Flash Cannon', N'STEEL', N'Special', 80, 100, 10, N'TM91', N'May lower opponents Special Defense.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (186, N'Flatter', N'DARK', N'Status', NULL, 100, 15, NULL, N'Confuses opponent, but raises its Special Attack by two stages.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (187, N'Fling', N'DARK', N'Physical', NULL, 100, 10, N'TM56', N'Power depends on held item.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (188, N'Flower Shield', N'FAIRY', N'Status', NULL, NULL, 10, NULL, N'Sharply raises Defense of all Grass-type Pokémon on the field.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (189, N'Fly', N'FLYING', N'Physical', 90, 95, 15, N'HM02', N'Flies up on first turn, attacks on second turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (190, N'Flying Press', N'FIGHTING', N'Physical', 80, 95, 10, NULL, N'Deals Fighting and Flying type damage.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (191, N'Focus Blast', N'FIGHTING', N'Special', 120, 70, 5, N'TM52', N'May lower opponents Special Defense.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (192, N'Focus Energy', N'NORMAL', N'Status', NULL, NULL, 30, NULL, N'Increases critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (193, N'Focus Punch', N'FIGHTING', N'Physical', 150, 100, 20, NULL, N'If the user is hit before attacking, it flinches instead.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (194, N'Follow Me', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'In Double Battle, the user takes all the attacks.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (195, N'Force Palm', N'FIGHTING', N'Physical', 60, 100, 10, NULL, N'May paralyze opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (196, N'Foresight', N'NORMAL', N'Status', NULL, NULL, 40, NULL, N'Resets opponents Evasiveness, Normal type and Fighting-type attacks can now hit Ghosts, and Ghost-type attacks hit Normal.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (197, N'Forests Curse', N'GRASS', N'Status', NULL, 100, 20, NULL, N'Adds Grass type to opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (198, N'Foul Play', N'DARK', N'Physical', 95, 100, 15, NULL, N'Uses the opponents Attack stat.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (199, N'Freeze Shock', N'ICE', N'Physical', 140, 90, 5, NULL, N'Charges on first turn, attacks on second. May paralyze opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (200, N'Freeze-Dry', N'ICE', N'Special', 70, 100, 20, NULL, N'May freeze opponent. Super-effective against Water types.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (201, N'Frenzy Plant', N'GRASS', N'Special', 150, 90, 5, NULL, N'User must recharge next turn.', NULL)
GO
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (202, N'Frost Breath', N'ICE', N'Special', 60, 90, 10, N'TM79', N'Always results in a critical hit.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (203, N'Frustration', N'NORMAL', N'Physical', NULL, 100, 20, N'TM21', N'Power decreases with higher Happiness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (204, N'Fury Attack', N'NORMAL', N'Physical', 15, 85, 20, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (205, N'Fury Cutter', N'BUG', N'Physical', 40, 95, 20, NULL, N'Power increases each turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (206, N'Fury Swipes', N'NORMAL', N'Physical', 18, 80, 15, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (207, N'Fusion Bolt', N'ELECTRIC', N'Physical', 100, 100, 5, NULL, N'Power increases if Fusion Flare is used in the same turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (208, N'Fusion Flare', N'FIRE', N'Special', 100, 100, 5, NULL, N'Power increases if Fusion Bolt is used in the same turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (209, N'Future Sight', N'PSYCHIC', N'Special', 120, 100, 10, NULL, N'Damage occurs 2 turns later.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (210, N'Gastro Acid', N'POISON', N'Status', NULL, 100, 10, NULL, N'Cancels out the effect of the opponents Ability.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (211, N'Gear Grind', N'STEEL', N'Physical', 50, 85, 15, NULL, N'Hits twice in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (212, N'Geomancy', N'FAIRY', N'Status', NULL, NULL, 10, NULL, N'Charges on first turn, sharply raises users Sp. Attack, Sp. Defense and Speed on the second.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (213, N'Giga Drain', N'GRASS', N'Special', 75, 100, 10, NULL, N'User recovers half the HP inflicted on opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (214, N'Giga Impact', N'NORMAL', N'Physical', 150, 90, 5, N'TM68', N'User must recharge next turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (215, N'Glaciate', N'ICE', N'Special', 65, 95, 10, NULL, N'Lowers opponents Speed.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (216, N'Glare', N'NORMAL', N'Status', NULL, 100, 30, NULL, N'Paralyzes opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (217, N'Grass Knot', N'GRASS', N'Special', NULL, 100, 20, N'TM86', N'The heavier the opponent, the stronger the attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (218, N'Grass Pledge', N'GRASS', N'Special', 80, 100, 10, NULL, N'Added effects appear if preceded by Water Pledge or succeeded by Fire Pledge.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (219, N'Grass Whistle', N'GRASS', N'Status', NULL, 55, 15, NULL, N'Puts opponent to sleep.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (220, N'Grassy Terrain', N'GRASS', N'Status', NULL, NULL, 10, NULL, N'Restores a little HP of all Pokémon for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (221, N'Gravity', N'PSYCHIC', N'Status', NULL, NULL, 5, NULL, N'Prevents moves like Fly and Bounce and the Ability Levitate for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (222, N'Growl', N'NORMAL', N'Status', NULL, 100, 40, NULL, N'Lowers opponents Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (223, N'Growth', N'NORMAL', N'Status', NULL, NULL, 40, NULL, N'Raises users Attack and Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (224, N'Grudge', N'GHOST', N'Status', NULL, NULL, 5, NULL, N'If the users faints after using this move, the PP for the opponents last move is depleted.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (225, N'Guard Split', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'Averages Defense and Special Defense with the target.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (226, N'Guard Swap', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'User and opponent swap Defense and Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (227, N'Guillotine', N'NORMAL', N'Physical', NULL, NULL, 5, NULL, N'One-Hit-KO, if it hits.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (228, N'Gunk Shot', N'POISON', N'Physical', 120, 80, 5, NULL, N'May poison opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (229, N'Gust', N'FLYING', N'Special', 40, 100, 35, NULL, N'Hits Pokémon using Fly/Bounce with double power.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (230, N'Gyro Ball', N'STEEL', N'Physical', NULL, 100, 5, N'TM74', N'The slower the user, the stronger the attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (231, N'Hail', N'ICE', N'Status', NULL, NULL, 10, N'TM07', N'Non-Ice types are damaged for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (232, N'Hammer Arm', N'FIGHTING', N'Physical', 100, 90, 10, NULL, N'Lowers users Speed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (233, N'Happy Hour', N'NORMAL', N'Status', NULL, NULL, 30, NULL, N'Doubles prize money from trainer battles.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (234, N'Harden', N'NORMAL', N'Status', NULL, NULL, 30, NULL, N'Raises users Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (235, N'Haze', N'ICE', N'Status', NULL, NULL, 30, NULL, N'Resets all stat changes.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (236, N'Head Charge', N'NORMAL', N'Physical', 120, 100, 15, NULL, N'User receives recoil damage.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (237, N'Head Smash', N'ROCK', N'Physical', 150, 80, 5, NULL, N'User receives recoil damage.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (238, N'Headbutt', N'NORMAL', N'Physical', 70, 100, 15, NULL, N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (239, N'Heal Bell', N'NORMAL', N'Status', NULL, NULL, 5, NULL, N'Heals the users partys status conditions.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (240, N'Heal Block', N'PSYCHIC', N'Status', NULL, NULL, 15, NULL, N'Prevents the opponent from restoring HP for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (241, N'Heal Order', N'BUG', N'Status', NULL, NULL, 10, NULL, N'User recovers half its max HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (242, N'Heal Pulse', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'Restores half the targets max HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (243, N'Healing Wish', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'The user faints and the next Pokémon released is fully healed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (244, N'Heart Stamp', N'PSYCHIC', N'Physical', 60, 100, 25, NULL, N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (245, N'Heart Swap', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'Stat changes are swapped with the opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (246, N'Heat Crash', N'FIRE', N'Physical', NULL, 100, 10, NULL, N'The heavier the user, the stronger the attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (247, N'Heat Wave', N'FIRE', N'Special', 95, 90, 10, NULL, N'May burn opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (248, N'Heavy Slam', N'STEEL', N'Physical', NULL, 100, 10, NULL, N'The heavier the user, the stronger the attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (249, N'Helping Hand', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'In Double Battles, boosts the power of the partners move.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (250, N'Hex', N'GHOST', N'Special', 65, 100, 10, NULL, N'Inflicts more damage if the target has a status condition.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (251, N'Hidden Power', N'NORMAL', N'Special', 60, 100, 15, N'TM10', N'Type and power depends on users IVs.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (252, N'High Jump Kick', N'FIGHTING', N'Physical', 130, 90, 10, NULL, N'If it misses, the user loses half their HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (253, N'Hold Back', N'NORMAL', N'Physical', 40, 100, 40, NULL, N'Always leaves opponent with at least 1 HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (254, N'Hold Hands', N'NORMAL', N'Status', NULL, NULL, 40, NULL, N'Makes the user and an ally very happy.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (255, N'Hone Claws', N'DARK', N'Status', NULL, NULL, 15, N'TM01', N'Raises users Attack and Accuracy.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (256, N'Horn Attack', N'NORMAL', N'Physical', 65, 100, 25, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (257, N'Horn Drill', N'NORMAL', N'Physical', NULL, NULL, 5, NULL, N'One-Hit-KO, if it hits.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (258, N'Horn Leech', N'GRASS', N'Physical', 75, 100, 10, NULL, N'User recovers half the HP inflicted on opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (259, N'Howl', N'NORMAL', N'Status', NULL, NULL, 40, NULL, N'Raises users Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (260, N'Hurricane', N'FLYING', N'Special', 110, 70, 10, NULL, N'May confuse opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (261, N'Hydro Cannon', N'WATER', N'Special', 150, 90, 5, NULL, N'User must recharge next turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (262, N'Hydro Pump', N'WATER', N'Special', 110, 80, 5, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (263, N'Hyper Beam', N'NORMAL', N'Special', 150, 90, 5, N'TM15', N'User must recharge next turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (264, N'Hyper Fang', N'NORMAL', N'Physical', 80, 90, 15, NULL, N'May cause flinching.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (265, N'Hyper Voice', N'NORMAL', N'Special', 90, 100, 10, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (266, N'Hyperspace Fury', N'DARK', N'Physical', 100, -1, 5, NULL, N'Lowers users Defense. Can strike through Protect/Detect.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (267, N'Hyperspace Hole', N'PSYCHIC', N'Special', 80, -1, 5, NULL, N'Can strike through Protect/Detect.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (268, N'Hypnosis', N'PSYCHIC', N'Status', NULL, 60, 20, NULL, N'Puts opponent to sleep.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (269, N'Ice Ball', N'ICE', N'Physical', 30, 90, 20, NULL, N'Doubles in power each turn for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (270, N'Ice Beam', N'ICE', N'Special', 90, 100, 10, N'TM13', N'May freeze opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (271, N'Ice Burn', N'ICE', N'Special', 140, 90, 5, NULL, N'Charges on first turn, attacks on second. May burn opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (272, N'Ice Fang', N'ICE', N'Physical', 65, 95, 15, NULL, N'May cause flinching and/or freeze opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (273, N'Ice Punch', N'ICE', N'Physical', 75, 100, 15, NULL, N'May freeze opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (274, N'Ice Shard', N'ICE', N'Physical', 40, 100, 30, NULL, N'User attacks first.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (275, N'Icicle Crash', N'ICE', N'Physical', 85, 90, 10, NULL, N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (276, N'Icicle Spear', N'ICE', N'Physical', 25, 100, 30, NULL, N'Hits 2 5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (277, N'Icy Wind', N'ICE', N'Special', 55, 95, 15, NULL, N'Lowers opponents Speed.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (278, N'Imprison', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'Opponent is unable to use moves that the user also knows.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (279, N'Incinerate', N'FIRE', N'Special', 60, 100, 15, N'TM59', N'Destroys the targets held berry.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (280, N'Inferno', N'FIRE', N'Special', 100, 50, 5, NULL, N'Burns opponent.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (281, N'Infestation', N'BUG', N'Special', 20, 100, 20, N'TM83', N'Traps opponent, damaging them for 4-5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (282, N'Ingrain', N'GRASS', N'Status', NULL, NULL, 20, NULL, N'User restores HP each turn. User cannot escape/switch.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (283, N'Ion Deluge', N'ELECTRIC', N'Status', NULL, NULL, 25, NULL, N'Changes Normal-type moves to Electric-type.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (284, N'Iron Defense', N'STEEL', N'Status', NULL, NULL, 15, NULL, N'Sharply raises users Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (285, N'Iron Head', N'STEEL', N'Physical', 80, 100, 15, NULL, N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (286, N'Iron Tail', N'STEEL', N'Physical', 100, 75, 15, NULL, N'May lower opponents Defense.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (287, N'Judgment', N'NORMAL', N'Special', 100, 100, 10, NULL, N'Type depends on the Arceus Plate being held.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (288, N'Jump Kick', N'FIGHTING', N'Physical', 100, 95, 10, NULL, N'If it misses, the user loses half their HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (289, N'Karate Chop', N'FIGHTING', N'Physical', 50, 100, 25, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (290, N'Kinesis', N'PSYCHIC', N'Status', NULL, 80, 15, NULL, N'Lowers opponents Accuracy.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (291, N'Kings Shield', N'STEEL', N'Status', NULL, NULL, 10, NULL, N'Protects against attacks, and lowers opponents Attack on contact.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (292, N'Knock Off', N'DARK', N'Physical', 65, 100, 25, NULL, N'Removes opponents held item for the rest of the battle.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (293, N'Lands Wrath', N'GROUND', N'Physical', 90, 100, 10, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (294, N'Last Resort', N'NORMAL', N'Physical', 140, 100, 5, NULL, N'Can only be used after all other moves are used.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (295, N'Lava Plume', N'FIRE', N'Special', 80, 100, 15, NULL, N'May burn opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (296, N'Leaf Blade', N'GRASS', N'Physical', 90, 100, 15, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (297, N'Leaf Storm', N'GRASS', N'Special', 130, 90, 5, NULL, N'Sharply lowers users Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (298, N'Leaf Tornado', N'GRASS', N'Special', 65, 90, 10, NULL, N'May lower opponents Accuracy.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (299, N'Leech Life', N'BUG', N'Physical', 20, 100, 15, NULL, N'User recovers half the HP inflicted on opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (300, N'Leech Seed', N'GRASS', N'Status', NULL, 90, 10, NULL, N'User steals HP from opponent each turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (301, N'Leer', N'NORMAL', N'Status', NULL, 100, 30, NULL, N'Lowers opponents Defense.', NULL)
GO
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (302, N'Lick', N'GHOST', N'Physical', 30, 100, 30, NULL, N'May paralyze opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (303, N'Light of Ruin', N'FAIRY', N'Special', 140, 90, 5, NULL, N'User receives recoil damage.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (304, N'Light Screen', N'PSYCHIC', N'Status', NULL, NULL, 30, N'TM16', N'Halves damage from Special attacks for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (305, N'Lock-On', N'NORMAL', N'Status', NULL, NULL, 5, NULL, N'The next move the user uses is guaranteed to hit.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (306, N'Lovely Kiss', N'NORMAL', N'Status', NULL, 75, 10, NULL, N'Puts opponent to sleep.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (307, N'Low Kick', N'FIGHTING', N'Physical', NULL, 100, 20, NULL, N'The heavier the opponent, the stronger the attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (308, N'Low Sweep', N'FIGHTING', N'Physical', 65, 100, 20, N'TM47', N'Lowers opponents Speed.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (309, N'Lucky Chant', N'NORMAL', N'Status', NULL, NULL, 30, NULL, N'Opponent cannot land critical hits for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (310, N'Lunar Dance', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'The user faints but the next Pokémon released is fully healed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (311, N'Luster Purge', N'PSYCHIC', N'Special', 70, 100, 5, NULL, N'May lower opponents Special Defense.', 50)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (312, N'Mach Punch', N'FIGHTING', N'Physical', 40, 100, 30, NULL, N'User attacks first.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (313, N'Magic Coat', N'PSYCHIC', N'Status', NULL, NULL, 15, NULL, N'Any special move is reflected back to the attacker.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (314, N'Magic Room', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'Suppresses the effects of held items for five turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (315, N'Magical Leaf', N'GRASS', N'Special', 60, -1, 20, NULL, N'Ignores Accuracy and Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (316, N'Magma Storm', N'FIRE', N'Special', 120, 75, 5, NULL, N'Traps opponent, damaging them for 4-5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (317, N'Magnet Bomb', N'STEEL', N'Physical', 60, -1, 20, NULL, N'Ignores Accuracy and Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (318, N'Magnet Rise', N'ELECTRIC', N'Status', NULL, NULL, 10, NULL, N'User becomes immune to Ground-type moves for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (319, N'Magnetic Flux', N'ELECTRIC', N'Status', NULL, NULL, 20, NULL, N'Raises Defense and Sp. Defense of Plus/Minus Pokémon.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (320, N'Magnitude', N'GROUND', N'Physical', NULL, 100, 30, NULL, N'Hits with random power.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (321, N'Mat Block', N'FIGHTING', N'Status', NULL, NULL, 15, NULL, N'Protects teammates from damaging moves.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (322, N'Me First', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'User copies the opponents attack with 1.5× power.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (323, N'Mean Look', N'NORMAL', N'Status', NULL, NULL, 5, NULL, N'Opponent cannot flee or switch.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (324, N'Meditate', N'PSYCHIC', N'Status', NULL, NULL, 40, NULL, N'Raises users Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (325, N'Mega Drain', N'GRASS', N'Special', 40, 100, 15, NULL, N'User recovers half the HP inflicted on opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (326, N'Mega Kick', N'NORMAL', N'Physical', 120, 75, 5, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (327, N'Mega Punch', N'NORMAL', N'Physical', 80, 85, 20, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (328, N'Megahorn', N'BUG', N'Physical', 120, 85, 10, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (329, N'Memento', N'DARK', N'Status', NULL, 100, 10, NULL, N'User faints, sharply lowers opponents Attack and Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (330, N'Metal Burst', N'STEEL', N'Physical', NULL, 100, 10, NULL, N'Deals damage equal to 1.5x opponents attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (331, N'Metal Claw', N'STEEL', N'Physical', 50, 95, 35, NULL, N'May raise users Attack.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (332, N'Metal Sound', N'STEEL', N'Status', NULL, 85, 40, NULL, N'Sharply lowers opponents Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (333, N'Meteor Mash', N'STEEL', N'Physical', 90, 90, 10, NULL, N'May raise users Attack.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (334, N'Metronome', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'User performs any move in the game at random.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (335, N'Milk Drink', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'User recovers half its max HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (336, N'Mimic', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'Copies the opponents last move.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (337, N'Mind Reader', N'NORMAL', N'Status', NULL, NULL, 5, NULL, N'users next attack is guaranteed to hit.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (338, N'Minimize', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'Sharply raises users Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (339, N'Miracle Eye', N'PSYCHIC', N'Status', NULL, NULL, 40, NULL, N'Resets opponents Evasiveness, removes Darks Psychic immunity.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (340, N'Mirror Coat', N'PSYCHIC', N'Special', NULL, 100, 20, NULL, N'When hit by a Special Attack, user strikes back with 2x power.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (341, N'Mirror Move', N'FLYING', N'Status', NULL, NULL, 20, NULL, N'User performs the opponents last move.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (342, N'Mirror Shot', N'STEEL', N'Special', 65, 85, 10, NULL, N'May lower opponents Accuracy.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (343, N'Mist', N'ICE', N'Status', NULL, NULL, 30, NULL, N'users stats cannot be changed for a period of time.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (344, N'Mist Ball', N'PSYCHIC', N'Special', 70, 100, 5, NULL, N'May lower opponents Special Attack.', 50)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (345, N'Misty Terrain', N'FAIRY', N'Status', NULL, NULL, 10, NULL, N'Protects the field from status conditions for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (346, N'Moonblast', N'FAIRY', N'Special', 95, 100, 15, NULL, N'May lower opponents Special Attack.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (347, N'Moonlight', N'FAIRY', N'Status', NULL, NULL, 5, NULL, N'User recovers HP. Amount varies with the weather.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (348, N'Morning Sun', N'NORMAL', N'Status', NULL, NULL, 5, NULL, N'User recovers HP. Amount varies with the weather.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (349, N'Mud Bomb', N'GROUND', N'Special', 65, 85, 10, NULL, N'May lower opponents Accuracy.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (350, N'Mud Shot', N'GROUND', N'Special', 55, 95, 15, NULL, N'Lowers opponents Speed.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (351, N'Mud Sport', N'GROUND', N'Status', NULL, NULL, 15, NULL, N'Weakens the power of Electric-type moves.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (352, N'Mud-Slap', N'GROUND', N'Special', 20, 100, 10, NULL, N'Lowers opponents Accuracy.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (353, N'Muddy Water', N'WATER', N'Special', 90, 85, 10, NULL, N'May lower opponents Accuracy.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (354, N'Mystical Fire', N'FIRE', N'Special', 65, 100, 10, NULL, N'Lowers opponents Special Attack.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (355, N'Nasty Plot', N'DARK', N'Status', NULL, NULL, 20, NULL, N'Sharply raises users Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (356, N'Natural Gift', N'NORMAL', N'Physical', NULL, 100, 15, NULL, N'Power and type depend on the users held berry.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (357, N'Nature Power', N'NORMAL', N'Status', NULL, NULL, 20, N'TM96', N'Uses a certain move based on the current terrain.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (358, N'Needle Arm', N'GRASS', N'Physical', 60, 100, 15, NULL, N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (359, N'Night Daze', N'DARK', N'Special', 85, 95, 10, NULL, N'May lower opponents Accuracy.', 40)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (360, N'Night Shade', N'GHOST', N'Special', NULL, 100, 15, NULL, N'Inflicts damage equal to users level.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (361, N'Night Slash', N'DARK', N'Physical', 70, 100, 15, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (362, N'Nightmare', N'GHOST', N'Special', NULL, 100, 15, NULL, N'The sleeping opponent loses 25% of its max HP each turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (363, N'Noble Roar', N'NORMAL', N'Status', NULL, 100, 30, NULL, N'Lowers opponents Attack and Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (364, N'Nuzzle', N'ELECTRIC', N'Physical', 20, 100, 20, NULL, N'Paralyzes opponent.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (365, N'Oblivion Wing', N'FLYING', N'Special', 80, 100, 10, NULL, N'User recovers most of the HP inflicted on opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (366, N'Octazooka', N'WATER', N'Special', 65, 85, 10, NULL, N'May lower opponents Accuracy.', 50)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (367, N'Odor Sleuth', N'NORMAL', N'Status', NULL, NULL, 40, NULL, N'Resets opponents Evasiveness, Normal-type and Fighting-type attacks can now hit Ghosts, and Ghost-type attacks hit Normal.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (368, N'Ominous Wind', N'GHOST', N'Special', 60, 100, 5, NULL, N'May raise all users stats at once.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (369, N'Origin Pulse', N'WATER', N'Special', 110, 85, 10, NULL, N'Hits all adjacent opponents.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (370, N'Outrage', N'DRAGON', N'Physical', 120, 100, 10, NULL, N'User attacks for 2-3 turns but then becomes confused.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (371, N'Overheat', N'FIRE', N'Special', 130, 90, 5, N'TM50', N'Sharply lowers users Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (372, N'Pain Split', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'The users and opponents HP becomes the average of both.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (373, N'Parabolic Charge', N'ELECTRIC', N'Special', 50, 100, 20, NULL, N'User recovers half the HP inflicted on opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (374, N'Parting Shot', N'DARK', N'Status', NULL, 100, 20, NULL, N'Lowers opponents Attack and Special Attack then switches out.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (375, N'Pay Day', N'NORMAL', N'Physical', 40, 100, 20, NULL, N'A small amount of money is gained after the battle resolves.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (376, N'Payback', N'DARK', N'Physical', 50, 100, 10, N'TM66', N'Power doubles if the user was attacked first.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (377, N'Peck', N'FLYING', N'Physical', 35, 100, 35, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (378, N'Perish Song', N'NORMAL', N'Status', NULL, NULL, 5, NULL, N'Any Pokémon in play when this attack is used faints in 3 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (379, N'Petal Blizzard', N'GRASS', N'Physical', 90, 100, 15, NULL, N'Hits all adjacent Pokémon.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (380, N'Petal Dance', N'GRASS', N'Special', 120, 100, 10, NULL, N'User attacks for 2-3 turns but then becomes confused.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (381, N'Phantom Force', N'GHOST', N'Physical', 90, 100, 10, NULL, N'Disappears on first turn, attacks on second. Can strike through Protect/Detect.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (382, N'Pin Missile', N'BUG', N'Physical', 25, 95, 20, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (383, N'Play Nice', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'Lowers opponents Attack. Always hits.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (384, N'Play Rough', N'FAIRY', N'Physical', 90, 90, 10, NULL, N'May lower opponents Attack.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (385, N'Pluck', N'FLYING', N'Physical', 60, 100, 20, NULL, N'If the opponent is holding a berry, its effect is stolen by user.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (386, N'Poison Fang', N'POISON', N'Physical', 50, 100, 15, NULL, N'May badly poison opponent.', 50)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (387, N'Poison Gas', N'POISON', N'Status', NULL, 90, 40, NULL, N'Poisons opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (388, N'Poison Jab', N'POISON', N'Physical', 80, 100, 20, N'TM84', N'May poison the opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (389, N'Poison Powder', N'POISON', N'Status', NULL, 75, 35, NULL, N'Poisons opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (390, N'Poison Sting', N'POISON', N'Physical', 15, 100, 35, NULL, N'May poison the opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (391, N'Poison Tail', N'POISON', N'Physical', 50, 100, 25, NULL, N'High critical hit ratio. May poison opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (392, N'Pound', N'NORMAL', N'Physical', 40, 100, 35, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (393, N'Powder', N'BUG', N'Status', NULL, 100, 20, NULL, N'Damages Pokémon using Fire type moves.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (394, N'Powder Snow', N'ICE', N'Special', 40, 100, 25, NULL, N'May freeze opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (395, N'Power Gem', N'ROCK', N'Special', 80, 100, 20, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (396, N'Power Split', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'Averages Attack and Special Attack with the target.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (397, N'Power Swap', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'User and opponent swap Attack and Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (398, N'Power Trick', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'users own Attack and Defense switch.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (399, N'Power Whip', N'GRASS', N'Physical', 120, 85, 10, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (400, N'Power-Up Punch', N'FIGHTING', N'Physical', 40, 100, 10, N'TM98', N'Raises Attack.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (401, N'Precipice Blades', N'GROUND', N'Physical', 120, 85, 10, NULL, N'Hits all adjacent opponents.', NULL)
GO
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (402, N'Present', N'NORMAL', N'Physical', NULL, 90, 15, NULL, N'Either deals damage or heals.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (403, N'Protect', N'NORMAL', N'Status', NULL, NULL, 10, N'TM17', N'User is not affected by opponents move.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (404, N'Psybeam', N'PSYCHIC', N'Special', 65, 100, 20, NULL, N'May confuse opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (405, N'Psych Up', N'NORMAL', N'Status', NULL, NULL, 10, N'TM77', N'Copies the opponents stat changes.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (406, N'Psychic', N'PSYCHIC', N'Special', 90, 100, 10, N'TM29', N'May lower opponents Special Defense.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (407, N'Psycho Boost', N'PSYCHIC', N'Special', 140, 90, 5, NULL, N'Sharply lowers users Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (408, N'Psycho Cut', N'PSYCHIC', N'Physical', 70, 100, 20, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (409, N'Psycho Shift', N'PSYCHIC', N'Status', NULL, 90, 10, NULL, N'Gives the opponent the users status condition, if it hits.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (410, N'Psyshock', N'PSYCHIC', N'Special', 80, 100, 10, N'TM03', N'Inflicts damage based on the targets Defense, not Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (411, N'Psystrike', N'PSYCHIC', N'Special', 100, 100, 10, NULL, N'Inflicts damage based on the targets Defense, not Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (412, N'Psywave', N'PSYCHIC', N'Special', NULL, 80, 15, NULL, N'Inflicts damage 50-150% of users level.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (413, N'Punishment', N'DARK', N'Physical', NULL, 100, 5, NULL, N'Power increases when opponents stats have been raised.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (414, N'Pursuit', N'DARK', N'Physical', 40, 100, 20, NULL, N'Double power if the opponent is switching out.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (415, N'Quash', N'DARK', N'Status', NULL, 100, 15, N'TM60', N'Makes the target act last this turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (416, N'Quick Attack', N'NORMAL', N'Physical', 40, 100, 30, NULL, N'User attacks first.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (417, N'Quick Guard', N'FIGHTING', N'Status', NULL, NULL, 15, NULL, N'Fast moves wont damage the user or its teammates.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (418, N'Quiver Dance', N'BUG', N'Status', NULL, NULL, 20, NULL, N'Raises users Special Attack, Special Defense and Speed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (419, N'Rage', N'NORMAL', N'Physical', 20, 100, 20, NULL, N'Raises users Attack when hit.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (420, N'Rage Powder', N'BUG', N'Status', NULL, NULL, 20, NULL, N'Forces attacks to hit user, not team-mates.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (421, N'Rain Dance', N'WATER', N'Status', NULL, NULL, 5, N'TM18', N'Makes it rain for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (422, N'Rapid Spin', N'NORMAL', N'Physical', 20, 100, 40, NULL, N'Removes effects of trap moves.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (423, N'Razor Leaf', N'GRASS', N'Physical', 55, 95, 25, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (424, N'Razor Shell', N'WATER', N'Physical', 75, 95, 10, NULL, N'May lower opponents Defense.', 50)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (425, N'Razor Wind', N'NORMAL', N'Special', 80, 100, 10, NULL, N'Charges on first turn, attacks on second. High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (426, N'Recover', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'User recovers half its max HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (427, N'Recycle', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'users used hold item is restored.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (428, N'Reflect', N'PSYCHIC', N'Status', NULL, NULL, 20, N'TM33', N'Halves damage from Physical attacks for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (429, N'Reflect Type', N'NORMAL', N'Status', NULL, NULL, 15, NULL, N'User becomes the targets type.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (430, N'Refresh', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'Cures paralysis, poison, and burns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (431, N'Relic Song', N'NORMAL', N'Special', 75, 100, 10, NULL, N'May put the target to sleep.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (432, N'Rest', N'PSYCHIC', N'Status', NULL, NULL, 10, N'TM44', N'User sleeps for 2 turns, but user is fully healed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (433, N'Retaliate', N'NORMAL', N'Physical', 70, 100, 5, N'TM67', N'Inflicts double damage if a teammate fainted on the last turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (434, N'Return', N'NORMAL', N'Physical', NULL, 100, 20, N'TM27', N'Power increases with users Happiness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (435, N'Revenge', N'FIGHTING', N'Physical', 60, 100, 10, NULL, N'Power increases if user was hit first.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (436, N'Reversal', N'FIGHTING', N'Physical', NULL, 100, 15, NULL, N'The lower the users HP, the higher the power.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (437, N'Roar', N'NORMAL', N'Status', NULL, NULL, 20, N'TM05', N'In battles, the opponent switches. In the wild, the Pokémon runs.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (438, N'Roar of Time', N'DRAGON', N'Special', 150, 90, 5, NULL, N'User must recharge next turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (439, N'Rock Blast', N'ROCK', N'Physical', 25, 90, 10, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (440, N'Rock Climb', N'NORMAL', N'Physical', 90, 85, 20, NULL, N'May confuse opponent.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (441, N'Rock Polish', N'ROCK', N'Status', NULL, NULL, 20, N'TM69', N'Sharply raises users Speed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (442, N'Rock Slide', N'ROCK', N'Physical', 75, 90, 10, N'TM80', N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (443, N'Rock Smash', N'FIGHTING', N'Physical', 40, 100, 15, N'HM06', N'May lower opponents Defense.', 50)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (444, N'Rock Throw', N'ROCK', N'Physical', 50, 90, 15, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (445, N'Rock Tomb', N'ROCK', N'Physical', 60, 95, 15, N'TM39', N'Lowers opponents Speed.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (446, N'Rock Wrecker', N'ROCK', N'Physical', 150, 90, 5, NULL, N'User must recharge next turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (447, N'Role Play', N'PSYCHIC', N'Status', NULL, NULL, 15, NULL, N'User copies the opponents Ability.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (448, N'Rolling Kick', N'FIGHTING', N'Physical', 60, 85, 15, NULL, N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (449, N'Rollout', N'ROCK', N'Physical', 30, 90, 20, NULL, N'Doubles in power each turn for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (450, N'Roost', N'FLYING', N'Status', NULL, NULL, 10, N'TM19', N'User recovers half of its max HP and loses the Flying type temporarily.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (451, N'Rototiller', N'GROUND', N'Status', NULL, NULL, 10, NULL, N'Raises Attack and Special Attack of Grass-types.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (452, N'Round', N'NORMAL', N'Special', 60, 100, 15, N'TM48', N'Power increases if teammates use it in the same turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (453, N'Sacred Fire', N'FIRE', N'Physical', 100, 95, 5, NULL, N'May burn opponent.', 50)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (454, N'Sacred Sword', N'FIGHTING', N'Physical', 90, 100, 20, NULL, N'Ignores opponents stat changes.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (455, N'Safeguard', N'NORMAL', N'Status', NULL, NULL, 25, N'TM20', N'The users party is protected from status conditions.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (456, N'Sand Attack', N'GROUND', N'Status', NULL, 100, 15, NULL, N'Lowers opponents Accuracy.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (457, N'Sand Tomb', N'GROUND', N'Physical', 35, 85, 15, NULL, N'Traps opponent, damaging them for 4-5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (458, N'Sandstorm', N'ROCK', N'Status', NULL, NULL, 10, N'TM37', N'Creates a sandstorm for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (459, N'Scald', N'WATER', N'Special', 80, 100, 15, N'TM55', N'May burn opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (460, N'Scary Face', N'NORMAL', N'Status', NULL, 100, 10, NULL, N'Sharply lowers opponents Speed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (461, N'Scratch', N'NORMAL', N'Physical', 40, 100, 35, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (462, N'Screech', N'NORMAL', N'Status', NULL, 85, 40, NULL, N'Sharply lowers opponents Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (463, N'Searing Shot', N'FIRE', N'Special', 100, 100, 5, NULL, N'May burn opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (464, N'Secret Power', N'NORMAL', N'Physical', 70, 100, 20, N'TM94', N'Effects of the attack vary with the location.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (465, N'Secret Sword', N'FIGHTING', N'Special', 85, 100, 10, NULL, N'Inflicts damage based on the targets Defense, not Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (466, N'Seed Bomb', N'GRASS', N'Physical', 80, 100, 15, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (467, N'Seed Flare', N'GRASS', N'Special', 120, 85, 5, NULL, N'May lower opponents Special Defense.', 40)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (468, N'Seismic Toss', N'FIGHTING', N'Physical', NULL, 100, 20, NULL, N'Inflicts damage equal to users level.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (469, N'Self-Destruct', N'NORMAL', N'Physical', 200, 100, 5, NULL, N'User faints.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (470, N'Shadow Ball', N'GHOST', N'Special', 80, 100, 15, N'TM30', N'May lower opponents Special Defense.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (471, N'Shadow Claw', N'GHOST', N'Physical', 70, 100, 15, N'TM65', N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (472, N'Shadow Force', N'GHOST', N'Physical', 120, 100, 5, NULL, N'Disappears on first turn, attacks on second. Can strike through Protect/Detect.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (473, N'Shadow Punch', N'GHOST', N'Physical', 60, -1, 20, NULL, N'Ignores Accuracy and Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (474, N'Shadow Sneak', N'GHOST', N'Physical', 40, 100, 30, NULL, N'User attacks first.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (475, N'Sharpen', N'NORMAL', N'Status', NULL, NULL, 30, NULL, N'Raises users Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (476, N'Sheer Cold', N'ICE', N'Special', NULL, NULL, 5, NULL, N'One-Hit-KO, if it hits.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (477, N'Shell Smash', N'NORMAL', N'Status', NULL, NULL, 15, NULL, N'Sharply raises users Attack, Special Attack and Speed but lowers Defense and Special Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (478, N'Shift Gear', N'STEEL', N'Status', NULL, NULL, 10, NULL, N'Raises users Attack and sharply raises Speed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (479, N'Shock Wave', N'ELECTRIC', N'Special', 60, -1, 20, NULL, N'Ignores Accuracy and Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (480, N'Signal Beam', N'BUG', N'Special', 75, 100, 15, NULL, N'May confuse opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (481, N'Silver Wind', N'BUG', N'Special', 60, 100, 5, NULL, N'May raise all stats of user at once.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (482, N'Simple Beam', N'NORMAL', N'Status', NULL, 100, 15, NULL, N'Changes targets ability to Simple.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (483, N'Sing', N'NORMAL', N'Status', NULL, 55, 15, NULL, N'Puts opponent to sleep.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (484, N'Sketch', N'NORMAL', N'Status', NULL, NULL, 1, NULL, N'Permanently copies the opponents last move.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (485, N'Skill Swap', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'The user swaps Abilities with the opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (486, N'Skull Bash', N'NORMAL', N'Physical', 130, 100, 10, NULL, N'Raises Defense on first turn, attacks on second.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (487, N'Sky Attack', N'FLYING', N'Physical', 140, 90, 5, NULL, N'Charges on first turn, attacks on second. May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (488, N'Sky Drop', N'FLYING', N'Physical', 60, 100, 10, N'TM58', N'Takes opponent into the air on first turn, drops them on second turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (489, N'Sky Uppercut', N'FIGHTING', N'Physical', 85, 90, 15, NULL, N'Hits the opponent, even during Fly.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (490, N'Slack Off', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'User recovers half its max HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (491, N'Slam', N'NORMAL', N'Physical', 80, 75, 20, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (492, N'Slash', N'NORMAL', N'Physical', 70, 100, 20, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (493, N'Sleep Powder', N'GRASS', N'Status', NULL, 75, 15, NULL, N'Puts opponent to sleep.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (494, N'Sleep Talk', N'NORMAL', N'Status', NULL, NULL, 10, N'TM88', N'User performs one of its own moves while sleeping.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (495, N'Sludge', N'POISON', N'Special', 65, 100, 20, NULL, N'May poison opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (496, N'Sludge Bomb', N'POISON', N'Special', 90, 100, 10, N'TM36', N'May poison opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (497, N'Sludge Wave', N'POISON', N'Special', 95, 100, 10, N'TM34', N'May poison opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (498, N'Smack Down', N'ROCK', N'Physical', 50, 100, 15, N'TM23', N'Makes Flying-type Pokémon vulnerable to Ground moves.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (499, N'Smelling Salts', N'NORMAL', N'Physical', 70, 100, 10, NULL, N'Power doubles if opponent is paralyzed, but cures it.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (500, N'Smog', N'POISON', N'Special', 30, 70, 20, NULL, N'May poison opponent.', 40)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (501, N'Smokescreen', N'NORMAL', N'Status', NULL, 100, 20, NULL, N'Lowers opponents Accuracy.', NULL)
GO
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (502, N'Snarl', N'DARK', N'Special', 55, 95, 15, N'TM95', N'Lowers opponents Special Attack.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (503, N'Snatch', N'DARK', N'Status', NULL, NULL, 10, NULL, N'Steals the effects of the opponents next move.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (504, N'Snore', N'NORMAL', N'Special', 50, 100, 15, NULL, N'Can only be used if asleep. May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (505, N'Soak', N'WATER', N'Status', NULL, 100, 20, NULL, N'Changes the targets type to water.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (506, N'Soft-Boiled', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'User recovers half its max HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (507, N'Solar Beam', N'GRASS', N'Special', 120, 100, 10, N'TM22', N'Charges on first turn, attacks on second.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (508, N'Sonic Boom', N'NORMAL', N'Special', NULL, 90, 20, NULL, N'Always inflicts 20 HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (509, N'Spacial Rend', N'DRAGON', N'Special', 100, 95, 5, NULL, N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (510, N'Spark', N'ELECTRIC', N'Physical', 65, 100, 20, NULL, N'May paralyze opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (511, N'Spider Web', N'BUG', N'Status', NULL, NULL, 10, NULL, N'Opponent cannot escape/switch.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (512, N'Spike Cannon', N'NORMAL', N'Physical', 20, 100, 15, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (513, N'Spikes', N'GROUND', N'Status', NULL, NULL, 20, NULL, N'Hurts opponents when they switch into battle.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (514, N'Spiky Shield', N'GRASS', N'Status', NULL, NULL, 10, NULL, N'Protects user and inflicts damage on contact moves.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (515, N'Spit Up', N'NORMAL', N'Special', NULL, 100, 10, NULL, N'Power depends on how many times the user performed Stockpile.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (516, N'Spite', N'GHOST', N'Status', NULL, 100, 10, NULL, N'The opponents last move loses 2-5 PP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (517, N'Splash', N'NORMAL', N'Status', NULL, NULL, 40, NULL, N'Doesnt do ANYTHING.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (518, N'Spore', N'GRASS', N'Status', NULL, 100, 15, NULL, N'Puts opponent to sleep.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (519, N'Stealth Rock', N'ROCK', N'Status', NULL, NULL, 20, NULL, N'Damages opponent switching into battle.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (520, N'Steam Eruption', N'WATER', N'Special', 110, 95, 5, NULL, N'May burn opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (521, N'Steamroller', N'BUG', N'Physical', 65, 100, 20, NULL, N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (522, N'Steel Wing', N'STEEL', N'Physical', 70, 90, 25, N'TM51', N'May raise users Defense.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (523, N'Sticky Web', N'BUG', N'Status', NULL, NULL, 20, NULL, N'Lowers opponents Speed when switching into battle.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (524, N'Stockpile', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'Stores energy for use with Spit Up and Swallow.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (525, N'Stomp', N'NORMAL', N'Physical', 65, 100, 20, NULL, N'May cause flinching.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (526, N'Stone Edge', N'ROCK', N'Physical', 100, 80, 5, N'TM71', N'High critical hit ratio.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (527, N'Stored Power', N'PSYCHIC', N'Special', 20, 100, 10, NULL, N'Power increases when users stats have been raised.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (528, N'Storm Throw', N'FIGHTING', N'Physical', 60, 100, 10, NULL, N'Always results in a critical hit.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (529, N'Strength', N'NORMAL', N'Physical', 80, 100, 15, N'HM04', NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (530, N'String Shot', N'BUG', N'Status', NULL, 95, 40, NULL, N'Sharply lowers opponents Speed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (531, N'Struggle', N'NORMAL', N'Physical', 50, 100, NULL, NULL, N'Only usable when all PP are gone. Hurts the user.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (532, N'Struggle Bug', N'BUG', N'Special', 50, 100, 20, N'TM76', N'Lowers opponents Special Attack.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (533, N'Stun Spore', N'GRASS', N'Status', NULL, 75, 30, NULL, N'Paralyzes opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (534, N'Submission', N'FIGHTING', N'Physical', 80, 80, 25, NULL, N'User receives recoil damage.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (535, N'Substitute', N'NORMAL', N'Status', NULL, NULL, 10, N'TM90', N'Uses HP to creates a decoy that takes hits.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (536, N'Sucker Punch', N'DARK', N'Physical', 80, 100, 5, NULL, N'User attacks first, but only works if opponent is readying an attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (537, N'Sunny Day', N'FIRE', N'Status', NULL, NULL, 5, N'TM11', N'Makes it sunny for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (538, N'Super Fang', N'NORMAL', N'Physical', NULL, 90, 10, NULL, N'Always takes off half of the opponents HP.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (539, N'Superpower', N'FIGHTING', N'Physical', 120, 100, 5, NULL, N'Lowers users Attack and Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (540, N'Supersonic', N'NORMAL', N'Status', NULL, 55, 20, NULL, N'Confuses opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (541, N'Surf', N'WATER', N'Special', 90, 100, 15, N'HM03', N'Hits all adjacent Pokémon.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (542, N'Swagger', N'NORMAL', N'Status', NULL, 90, 15, N'TM87', N'Opponent becomes confused, but its Attack is raised two stages.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (543, N'Swallow', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'The more times the user has performed Stockpile, the more HP is recovered.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (544, N'Sweet Kiss', N'FAIRY', N'Status', NULL, 75, 10, NULL, N'Confuses opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (545, N'Sweet Scent', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'Lowers opponents Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (546, N'Swift', N'NORMAL', N'Special', 60, -1, 20, NULL, N'Ignores Accuracy and Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (547, N'Switcheroo', N'DARK', N'Status', NULL, 100, 15, NULL, N'Swaps held items with the opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (548, N'Swords Dance', N'NORMAL', N'Status', NULL, NULL, 20, N'TM75', N'Sharply raises users Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (549, N'Synchronoise', N'PSYCHIC', N'Special', 120, 100, 15, NULL, N'Hits any Pokémon that shares a type with the user.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (550, N'Synthesis', N'GRASS', N'Status', NULL, NULL, 5, NULL, N'User recovers HP. Amount varies with the weather.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (551, N'Tackle', N'NORMAL', N'Physical', 50, 100, 35, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (552, N'Tail Glow', N'BUG', N'Status', NULL, NULL, 20, NULL, N'Drastically raises users Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (553, N'Tail Slap', N'NORMAL', N'Physical', 25, 85, 10, NULL, N'Hits 2-5 times in one turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (554, N'Tail Whip', N'NORMAL', N'Status', NULL, 100, 30, NULL, N'Lowers opponents Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (555, N'Tailwind', N'FLYING', N'Status', NULL, NULL, 30, NULL, N'Doubles Speed for 4 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (556, N'Take Down', N'NORMAL', N'Physical', 90, 85, 20, NULL, N'User receives recoil damage.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (557, N'Taunt', N'DARK', N'Status', NULL, 100, 20, N'TM12', N'Opponent can only use moves that attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (558, N'Techno Blast', N'NORMAL', N'Special', 85, 100, 5, NULL, N'Type depends on the Drive being held.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (559, N'Teeter Dance', N'NORMAL', N'Status', NULL, 100, 20, NULL, N'Confuses all Pokémon.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (560, N'Telekinesis', N'PSYCHIC', N'Status', NULL, NULL, 15, NULL, N'Ignores opponents Evasiveness for three turns, add Ground immunity.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (561, N'Teleport', N'PSYCHIC', N'Status', NULL, NULL, 20, NULL, N'Allows user to flee wild battles; also warps player to last PokéCenter.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (562, N'Thief', N'DARK', N'Physical', 60, 100, 25, N'TM46', N'Also steals opponents held item.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (563, N'Thousand Arrows', N'GROUND', N'Physical', 90, 100, 10, NULL, N'Makes Flying-type Pokémon vulnerable to Ground moves.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (564, N'Thousand Waves', N'GROUND', N'Physical', 90, 100, 10, NULL, N'Opponent cannot flee or switch.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (565, N'Thrash', N'NORMAL', N'Physical', 120, 100, 10, NULL, N'User attacks for 2-3 turns but then becomes confused.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (566, N'Thunder', N'ELECTRIC', N'Special', 110, 70, 10, N'TM25', N'May paralyze opponent.', 30)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (567, N'Thunder Fang', N'ELECTRIC', N'Physical', 65, 95, 15, NULL, N'May cause flinching and/or paralyze opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (568, N'Thunder Punch', N'ELECTRIC', N'Physical', 75, 100, 15, NULL, N'May paralyze opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (569, N'Thunder Shock', N'ELECTRIC', N'Special', 40, 100, 30, NULL, N'May paralyze opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (570, N'Thunder Wave', N'ELECTRIC', N'Status', NULL, 100, 20, N'TM73', N'Paralyzes opponent.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (571, N'Thunderbolt', N'ELECTRIC', N'Special', 90, 100, 15, N'TM24', N'May paralyze opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (572, N'Tickle', N'NORMAL', N'Status', NULL, 100, 20, NULL, N'Lowers opponents Attack and Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (573, N'Topsy-Turvy', N'DARK', N'Status', NULL, 100, 20, NULL, N'Reverses stat changes of opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (574, N'Torment', N'DARK', N'Status', NULL, 100, 15, N'TM41', N'Opponent cannot use the same move in a row.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (575, N'Toxic', N'POISON', N'Status', NULL, 90, 10, N'TM06', N'Badly poisons opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (576, N'Toxic Spikes', N'POISON', N'Status', NULL, NULL, 20, NULL, N'Poisons opponents when they switch into battle.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (577, N'Transform', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'User takes on the form and attacks of the opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (578, N'Tri Attack', N'NORMAL', N'Special', 80, 100, 10, NULL, N'May paralyze, burn or freeze opponent.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (579, N'Trick', N'PSYCHIC', N'Status', NULL, 100, 10, NULL, N'Swaps held items with the opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (580, N'Trick Room', N'PSYCHIC', N'Status', NULL, NULL, 5, N'TM92', N'Slower Pokémon move first in the turn for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (581, N'Trick-or-Treat', N'GHOST', N'Status', NULL, 100, 20, NULL, N'Adds Ghost type to opponent.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (582, N'Triple Kick', N'FIGHTING', N'Physical', 10, 90, 10, NULL, N'Hits thrice in one turn at increasing power.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (583, N'Trump Card', N'NORMAL', N'Special', NULL, -1, 5, NULL, N'The lower the PP, the higher the power.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (584, N'Twineedle', N'BUG', N'Physical', 25, 100, 20, NULL, N'Hits twice in one turn. May poison opponent.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (585, N'Twister', N'DRAGON', N'Special', 40, 100, 20, NULL, N'May cause flinching. Hits Pokémon using Fly/Bounce with double power.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (586, N'U-turn', N'BUG', N'Physical', 70, 100, 20, N'TM89', N'User switches out immediately after attacking.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (587, N'Uproar', N'NORMAL', N'Special', 90, 100, 10, NULL, N'User attacks for 3 turns and prevents sleep.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (588, N'V-create', N'FIRE', N'Physical', 180, 95, 5, NULL, N'Lowers users Defense, Special Defense and Speed.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (589, N'Vacuum Wave', N'FIGHTING', N'Special', 40, 100, 30, NULL, N'User attacks first.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (590, N'Venom Drench', N'POISON', N'Status', NULL, 100, 20, NULL, N'Lowers poisoned opponents Special Attack and Speed.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (591, N'Venoshock', N'POISON', N'Special', 65, 100, 10, N'TM09', N'Inflicts double damage if the target is poisoned.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (592, N'Vice Grip', N'NORMAL', N'Physical', 55, 100, 30, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (593, N'Vine Whip', N'GRASS', N'Physical', 45, 100, 25, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (594, N'Vital Throw', N'FIGHTING', N'Physical', 70, -1, 10, NULL, N'User attacks last, but ignores Accuracy and Evasiveness.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (595, N'Volt Switch', N'ELECTRIC', N'Special', 70, 100, 20, N'TM72', N'User must switch out after attacking.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (596, N'Volt Tackle', N'ELECTRIC', N'Physical', 120, 100, 15, NULL, N'User receives recoil damage. May paralyze opponent.', 10)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (597, N'Wake-Up Slap', N'FIGHTING', N'Physical', 70, 100, 10, NULL, N'Power doubles if opponent is asleep, but wakes it up.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (598, N'Water Gun', N'WATER', N'Special', 40, 100, 25, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (599, N'Water Pledge', N'WATER', N'Special', 80, 100, 10, NULL, N'Added effects appear if preceded by Fire Pledge or succeeded by Grass Pledge.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (600, N'Water Pulse', N'WATER', N'Special', 60, 100, 20, NULL, N'May confuse opponent.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (601, N'Water Shuriken', N'WATER', N'Physical', 15, 100, 10, NULL, N'Hits 2-5 times in one turn.', NULL)
GO
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (602, N'Water Sport', N'WATER', N'Status', NULL, NULL, 15, NULL, N'Weakens the power of Fire-type moves.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (603, N'Water Spout', N'WATER', N'Special', 150, 100, 5, NULL, N'The higher the users HP, the higher the damage caused.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (604, N'Waterfall', N'WATER', N'Physical', 80, 100, 15, N'HM05', N'May cause flinching.', 20)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (605, N'Weather Ball', N'NORMAL', N'Special', 50, 100, 10, NULL, N'Moves power and type changes with the weather.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (606, N'Whirlpool', N'WATER', N'Special', 35, 85, 15, NULL, N'Traps opponent, damaging them for 4-5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (607, N'Whirlwind', N'NORMAL', N'Status', NULL, NULL, 20, NULL, N'In battles, the opponent switches. In the wild, the Pokémon runs.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (608, N'Wide Guard', N'ROCK', N'Status', NULL, NULL, 10, NULL, N'Protects the users team from multi-target attacks.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (609, N'Wild Charge', N'ELECTRIC', N'Physical', 90, 100, 15, N'TM93', N'User receives recoil damage.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (610, N'Will-O-Wisp', N'FIRE', N'Status', NULL, 85, 15, N'TM61', N'Burns opponent.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (611, N'Wing Attack', N'FLYING', N'Physical', 60, 100, 35, NULL, NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (612, N'Wish', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'The user recovers HP in the following turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (613, N'Withdraw', N'WATER', N'Status', NULL, NULL, 40, NULL, N'Raises users Defense.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (614, N'Wonder Room', N'PSYCHIC', N'Status', NULL, NULL, 10, NULL, N'Swaps every Pokémons Defense and Special Defense for 5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (615, N'Wood Hammer', N'GRASS', N'Physical', 120, 100, 15, NULL, N'User receives recoil damage.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (616, N'Work Up', N'NORMAL', N'Status', NULL, NULL, 30, NULL, N'Raises users Attack and Special Attack.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (617, N'Worry Seed', N'GRASS', N'Status', NULL, 100, 10, NULL, N'Changes the opponents Ability to Insomnia.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (618, N'Wrap', N'NORMAL', N'Physical', 15, 90, 20, NULL, N'Traps opponent, damaging them for 4-5 turns.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (619, N'Wring Out', N'NORMAL', N'Special', NULL, 100, 5, NULL, N'The higher the opponents HP, the higher the damage.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (620, N'X-Scissor', N'BUG', N'Physical', 80, 100, 15, N'TM81', NULL, NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (621, N'Yawn', N'NORMAL', N'Status', NULL, NULL, 10, NULL, N'Puts opponent to sleep in the next turn.', NULL)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (622, N'Zap Cannon', N'ELECTRIC', N'Special', 120, 50, 5, NULL, N'Paralyzes opponent.', 100)
INSERT [dbo].[Moves] ([Id], [Name], [Type], [Category], [Power], [Accuracy], [PowerPoints], [TechnicalMachine], [Effect], [Probability]) VALUES (623, N'Zen Headbutt', N'PSYCHIC', N'Physical', 80, 90, 15, NULL, N'May cause flinching.', 20)
SET IDENTITY_INSERT [dbo].[Moves] OFF
SET IDENTITY_INSERT [dbo].[Pokemon] ON 

INSERT [dbo].[Pokemon] ([Id], [Name]) VALUES (1, N'Bulbasaur')
INSERT [dbo].[Pokemon] ([Id], [Name]) VALUES (2, N'Charmander')
SET IDENTITY_INSERT [dbo].[Pokemon] OFF
SET IDENTITY_INSERT [dbo].[Signs] ON 

INSERT [dbo].[Signs] ([Id], [Content], [LevelId]) VALUES (1, N'This is sign 1 again', 1)
INSERT [dbo].[Signs] ([Id], [Content], [LevelId]) VALUES (3, N'This is sign 2 again', 1)
INSERT [dbo].[Signs] ([Id], [Content], [LevelId]) VALUES (4, N'This is sign 1 again', 2)
INSERT [dbo].[Signs] ([Id], [Content], [LevelId]) VALUES (5, N'This is sign 2 again', 2)
SET IDENTITY_INSERT [dbo].[Signs] OFF
ALTER TABLE [dbo].[PokemonMoves]  WITH CHECK ADD FOREIGN KEY([MovesId])
REFERENCES [dbo].[Moves] ([Id])
GO
ALTER TABLE [dbo].[PokemonMoves]  WITH CHECK ADD FOREIGN KEY([PokemonId])
REFERENCES [dbo].[Pokemon] ([Id])
GO
ALTER TABLE [dbo].[Signs]  WITH CHECK ADD  CONSTRAINT [Signs_LevelId_FK] FOREIGN KEY([LevelId])
REFERENCES [dbo].[Level] ([Id])
GO
ALTER TABLE [dbo].[Signs] CHECK CONSTRAINT [Signs_LevelId_FK]
GO
/****** Object:  StoredProcedure [dbo].[GetNumberOfMovesPerPokemon]    Script Date: 8/24/2015 10:55:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetNumberOfMovesPerPokemon]
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT Pokemon.name as 'PokemonName', COUNT(PokemonMoves.MovesId) as 'NumberOfMoves'
FROM dbo.PokemonMoves
INNER JOIN dbo.Pokemon ON  Pokemon.Id = PokemonMoves.PokemonId
INNER JOIN dbo.Moves ON Moves.Id = PokemonMoves.MovesId
GROUP BY Pokemon.name
END

GO
/****** Object:  StoredProcedure [dbo].[GetPokemonMoves]    Script Date: 8/24/2015 10:55:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetPokemonMoves] 
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT Pokemon.name as 'PokemonName', Moves.name as 'MoveName', PokemonMoves.level as 'LevelLearned'
FROM dbo.PokemonMoves
INNER JOIN dbo.Pokemon ON  Pokemon.Id = PokemonMoves.PokemonId
INNER JOIN dbo.Moves ON Moves.Id = PokemonMoves.MovesId
END


GO
USE [master]
GO
ALTER DATABASE [PokeDB] SET  READ_WRITE 
GO
